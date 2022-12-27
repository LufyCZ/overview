import useSWR from "swr";
import { getTokenPrice } from "../index";
import { API, Validator, ValidatorIndex, ValidatorRocketpool } from "./types";

export async function getValidatorsByDeployer(address: string) {
  const validatorIndexes = await fetch(
    `https://beaconcha.in/api/v1/validator/eth1/${address}`
  )
    .then((data) => data.json())
    .then((data: API<ValidatorIndex>) =>
      Array.isArray(data.data) ? data.data : [data.data]
    );

  const validators = await fetch(
    `https://beaconcha.in/api/v1/validator/${validatorIndexes
      .map(({ validatorindex }) => validatorindex)
      .join(",")}`
  )
    .then((data) => data.json())
    .then((data: API<Validator>) =>
      Array.isArray(data.data) ? data.data : [data.data]
    );

  const validatorsRocketpool = await fetch(
    `https://beaconcha.in/api/v1/rocketpool/validator/${validatorIndexes
      .map(({ validatorindex }) => validatorindex)
      .join(",")}`
  )
    .then((data) => data.json())
    .then((data: API<ValidatorRocketpool>) =>
      Array.isArray(data.data) ? data.data : [data.data]
    );

  const validatorProcessed = validators?.map((validator) => {
    const validatorRocketpool = validatorsRocketpool?.find(
      (vR) => vR.index === validator.validatorindex
    );

    // expects 32eth validators
    const totalRewards = validator.balance / 10 ** 9 - 32;
    const myRewards = validatorRocketpool
      ? (validatorRocketpool.minipool_node_fee / 2) * totalRewards +
        totalRewards / 2
      : totalRewards;
    const balance = validatorRocketpool ? 16 + myRewards : validator.balance;

    return {
      index: validator.validatorindex,
      balance,
      rewards: myRewards,
    };
  });

  return {
    validators: validatorProcessed,
    rplStake: validatorsRocketpool?.[0].node_rpl_stake / 1e18 ?? 0,
    unclaimedRpl: validatorsRocketpool?.[0].unclaimed_rpl_rewards / 1e18 ?? 0,
  };
}

export async function getValidatorsByDeployers(addresses?: string[]) {
  const data = await Promise.all(
    addresses.map((address) => getValidatorsByDeployer(address))
  );

  return data?.reduce(
    (acc, cur, i) => ({ ...acc, [addresses[i]]: cur }),
    {} as Record<string, typeof data[0]>
  );
}

export async function getValidatorsBalances(addresses?: string[]) {
  const deployers = await getValidatorsByDeployers(addresses);

  const ethPrice = await getTokenPrice("ethereum");
  const rplPrice = await getTokenPrice("rocket-pool");

  return Object.values(deployers).reduce(
    (acc, { validators, rplStake, unclaimedRpl }) => {
      const balanceUsd =
        validators?.reduce((acc, cur) => (acc += cur.balance * ethPrice), 0) ??
        0;

      const rplUsd = (rplStake + unclaimedRpl) * rplPrice ?? 0;

      return acc + balanceUsd + rplUsd;
    },
    0
  );
}
