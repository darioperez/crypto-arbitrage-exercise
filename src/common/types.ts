export type TTokenInfo = {
  decimals: number;
  name: string;
  symbol: string;
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
  getDAIToBTC: () => Promise<[TTokenPrice, TTokenPrice]>;
  getDAIToETH: () => Promise<[TTokenPrice, TTokenPrice]>;
  getDAIToUSDT: () => Promise<[TTokenPrice, TTokenPrice]>;
};
