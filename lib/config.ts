import { Config } from "../config.sample.js";

export const getConfig = (): Config => JSON.parse(process.env.CONFIG);
