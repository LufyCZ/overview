import { Config } from "../../config.sample";

export async function getFioBalance(fio: Config["FIO"]) {
  const {
    metadata: { token },
  } = await fetch("https://www.fio.cz/smartbroker/", {
    method: "POST",
    headers: {
      Connection: "close",
      Host: "www.fio.cz",
    },
    body: JSON.stringify({
      request: { username: fio.username, password: fio.password },
      metadata: { action: "login", app: "android-1.0.4" },
    }),
  }).then((data) => data.json());

  // just for fun
  await fetch("https://www.fio.cz/smartbroker/", {
    method: "POST",
    headers: {
      Connection: "close",
      Host: "www.fio.cz",
    },
    body: JSON.stringify({
      request: {},
      metadata: {
        action: "user-config",
        token,
        app: "android-1.0.4",
      },
    }),
  });

  const {
    response: { defaultPortfolio: portfolioId },
  } = await fetch("https://www.fio.cz/smartbroker/", {
    method: "POST",
    headers: {
      Connection: "close",
      Host: "www.fio.cz",
    },
    body: JSON.stringify({
      request: {},
      metadata: {
        action: "list-portfolios",
        app: "android-1.0.4",
        token,
      },
    }),
  }).then((data) => data.json());

  const {
    response: { securities },
  } = await fetch("https://www.fio.cz/smartbroker/", {
    method: "POST",
    headers: {
      Connection: "close",
      Host: "www.fio.cz",
    },
    body: JSON.stringify({
      request: { market: "BCCP", idPortfolio: portfolioId },
      metadata: {
        action: "list-portfolio-securities",
        app: "android-1.0.4",
        token,
      },
    }),
  }).then((data) => data.json());

  const {
    info: { rate: CZKinUSDPrice },
  } = await fetch("https://api.exchangerate.host/convert?from=CZK&to=USD").then(
    (data) => data.json()
  );

  return securities.reduce((acc, cur) => cur.assets + acc, 0) * CZKinUSDPrice;
}
