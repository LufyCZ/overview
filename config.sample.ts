export interface Config {
  DEBANK?: string[];
  VALIDATOR_DEPLOYERS?: string[];
  BINANCE?: {
    public: string;
    private: string;
  };
  BITCOIN?: string[];
  FIO?: {
    username: string;
    password: string;
  };
  DEGIRO?: {
    username: string;
    password: string;
  };
}

// Create config.ts, copy the contents over
// Use pnpm get-config to get CONFIG env var
const config: Config = {};

console.log(`CONFIG=${JSON.stringify(config)}`);
