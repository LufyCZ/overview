export interface API<Data> {
  status: string;
  data: Data | Data[];
}

export interface ValidatorIndex {
  publickey: string;
  valid_signature: boolean;
  validatorindex: number;
}

export interface Validator {
  balance: number;
  pubkey: string;
  status: string;
  validatorindex: number;
}

export interface ValidatorRocketpool {
  index: number;
  minipool_node_fee: number;
  node_rpl_stake: number;
  unclaimed_rpl_rewards: number;
}
