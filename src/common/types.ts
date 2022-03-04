export type TAssetSymbols = "DAIUSDT" | "DAIETH" | "DAIBTC";
export type TBinanceSymbols = "DAIUSD" | "ETHUSD" | "ETHBTC" | "ETHUSDT";

export type TTokenInfo = {
  decimals: number;
  name: string;
  symbol: string;
};

export type TQuote = {
  exchange: string;
  name: string;
  symbol: string;
  price: string;
};

export type TTokenPrice = TTokenInfo & { price: string };

export type TTokenPair = {
  POOL_ADDRESS: string;
  TOKEN_A: TTokenInfo;
  TOKEN_B: TTokenInfo;
};

export type TTokenPairs = {
  [token: string]: TTokenPair;
};

export type TExchangeAPIFacade = {
  DAIBTC: () => Promise<[TTokenPrice, TTokenPrice]>;
  DAIETH: () => Promise<[TTokenPrice, TTokenPrice]>;
  DAIUSDT: () => Promise<[TTokenPrice, TTokenPrice]>;
};
