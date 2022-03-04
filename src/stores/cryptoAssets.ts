import { BinanceAPI, UniswapAPI } from "@/api";
import type { TAssetSymbols, TQuote } from "@/common/types";
import { defineStore } from "pinia";

export const useCryptoAssetsStore = defineStore({
  id: "cryptoAssets",
  state: () => ({
    assetsQuotes: {
      DAIBTC: [] as TQuote[],
      DAIETH: [] as TQuote[],
      DAIUSDT: [] as TQuote[],
    },
  }),
  getters: {},
  actions: {
    async fetchAssetQuotes(symbol: TAssetSymbols) {
      const binance = await BinanceAPI[symbol]();
      const uniswap = await UniswapAPI[symbol]();

      this.assetsQuotes[symbol] = [
        {
          exchange: "Binance",
          name: binance[1].name,
          price: binance[1].price,
          symbol: binance[1].symbol,
        },
        {
          exchange: "Uniswap",
          name: uniswap[1].name,
          price: uniswap[1].price,
          symbol: uniswap[1].symbol,
        },
      ];

      return this.assetsQuotes[symbol];
    },
  },
});
