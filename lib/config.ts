import { Config } from "../config.sample.js";

export const getConfig = (): Config =>
  process.env.CONFIG ? JSON.parse(process.env.CONFIG) : undefined;
