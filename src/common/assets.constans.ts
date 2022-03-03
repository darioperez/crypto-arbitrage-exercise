import type { TTokenInfo, TTokenPairs } from "./types";

export const CRYPTO_ASSETS: { [asset: string]: TTokenInfo } = {
  BTC: { symbol: "BTC", name: "Bitcoin", decimals: 8 },
  DAI: { symbol: "DAI", name: "DAI Coin", decimals: 18 },
  ETH: { symbol: "ETH", name: "Ether", decimals: 18 },
  USDT: { symbol: "USDT", name: "Tether", decimals: 6 },
};

export const UNISWAP_ASSET_PAIRS: TTokenPairs = {
  DAI_BTC: {
    POOL_ADDRESS: "0x391e8501b626c623d39474afca6f9e46c2686649",
    TOKEN_A: CRYPTO_ASSETS.DAI,
    TOKEN_B: CRYPTO_ASSETS.BTC,
  },
  ETH_DAI: {
    POOL_ADDRESS: "0x60594a405d53811d3bc4766596efd80fd545a270",
    TOKEN_A: CRYPTO_ASSETS.ETH,
    TOKEN_B: CRYPTO_ASSETS.DAI,
  },
  DAI_USDT: {
    POOL_ADDRESS: "0x6f48eca74b38d2936b02ab603ff4e36a6c0e3a77",
    TOKEN_A: CRYPTO_ASSETS.DAI,
    TOKEN_B: CRYPTO_ASSETS.USDT,
  },
};
