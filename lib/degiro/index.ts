import { Config } from "../../config.sample";

export async function getDegiroBalance(degiro: Config["DEGIRO"]) {
  const { sessionId } = await fetch(
    "https://trader.degiro.nl/login/secure/login",
    {
      method: "POST",
      body: JSON.stringify({
        isPassCodeReset: false,
        isRedirectToMobile: false,
        password: degiro.password,
        username: degiro.username.toLowerCase().trim(),
        queryParams: {
          reason: "session_expired",
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      referrer: "https://trader.degiro.nl/trader/",
    }
  ).then((data) => data.json());

  const { tradingUrl, paUrl } = await fetch(
    "https://trader.degiro.nl/login/secure/config",
    {
      headers: {
        Cookie: `JSESSIONID=${sessionId}`,
      },
      credentials: "include",
      referrer: "https://trader.degiro.nl/trader/",
    }
  )
    .then((data) => data.json())
    .then(({ data }) => data);

  const { intAccount } = await fetch(`${paUrl}client?sessionId=${sessionId}`, {
    headers: {
      Cookie: `JSESSIONID=${sessionId};`,
    },
    credentials: "include",
    referrer: "https://trader.degiro.nl/trader/",
  })
    .then((data) => data.json())
    .then(({ data }) => data);

  const {
    portfolio,
  }: { portfolio: { value: { value: { name: string; value: number }[] }[] } } =
    await fetch(
      `${tradingUrl}v5/update/${intAccount};jsessionid=${sessionId}?&portfolio=0`
    ).then((data) => data.json());

  await fetch(
    `https://trader.degiro.nl/trading/secure/logout;jsessionid=${sessionId}?intAccount=${intAccount}&sessionId=${sessionId}`
  );

  const {
    info: { rate: EURinUSDPrice },
  } = await fetch("https://api.exchangerate.host/convert?from=EUR&to=USD").then(
    (data) => data.json()
  );

  const balanceEur = portfolio.value.reduce(
    (acc, cur) => acc + cur.value.find((e) => e.name === "value").value,
    0
  );

  return EURinUSDPrice * balanceEur;
}
