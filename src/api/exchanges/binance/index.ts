import { BINANCE_ASSET_PAIRS } from "@/common/assets.constans";
import type { TExchangeAPIFacade, TTokenPrice } from "@/common/types";

type TBinanceSymbols = "DAIUSD" | "ETHUSD" | "ETHBTC" | "ETHUSDT";

const BASE_URL = "/api-binance/v3/ticker/price?symbol";

const getSymbolURL = (symbol: TBinanceSymbols): string =>
  `${BASE_URL}=${symbol}`;
const DAI_USD_URL = getSymbolURL("DAIUSD");
const ETH_USD_URL = getSymbolURL("ETHUSD");
const ETH_BTC_URL = getSymbolURL("ETHBTC");
const ETH_USDT_URL = getSymbolURL("ETHUSDT");

const getDAIToBTC = async (
  tokenPair = BINANCE_ASSET_PAIRS.DAI_BTC
): Promise<[TTokenPrice, TTokenPrice]> => {
  let result = -1;

  try {
    const DAItoUSDRate = fetch(DAI_USD_URL).then((res) => res.json());
    const ETHtoUSDRate = fetch(ETH_USD_URL).then((res) => res.json());
    const ETHtoBTCRate = fetch(ETH_BTC_URL).then((res) => res.json());

    const rates = await Promise.all([DAItoUSDRate, ETHtoUSDRate, ETHtoBTCRate]);

    result = (rates[0].price / rates[1].price) * rates[2].price;
  } catch (error) {
    console.error(error);
  }

  return [
    { ...tokenPair.TOKEN_A, price: "-1" } as TTokenPrice,
    { ...tokenPair.TOKEN_B, price: result.toString() } as TTokenPrice,
  ];
};

const getDAIToETH = async (
  tokenPair = BINANCE_ASSET_PAIRS.DAI_ETH
): Promise<[TTokenPrice, TTokenPrice]> => {
  let result = -1;

  try {
    const DAItoUSDRate = fetch(DAI_USD_URL).then((res) => res.json());
    const ETHtoUSDRate = fetch(ETH_USD_URL).then((res) => res.json());

    const rates = await Promise.all([DAItoUSDRate, ETHtoUSDRate]);

    result = rates[0].price / rates[1].price;
  } catch (error) {
    console.error(error);
  }

  return [
    { ...tokenPair.TOKEN_A, price: "-1" } as TTokenPrice,
    { ...tokenPair.TOKEN_B, price: result.toString() } as TTokenPrice,
  ];
};

const getDAIToUSDT = async (
  tokenPair = BINANCE_ASSET_PAIRS.DAI_USDT
): Promise<[TTokenPrice, TTokenPrice]> => {
  let result = -1;

  try {
    const DAItoUSDRate = fetch(DAI_USD_URL).then((res) => res.json());
    const ETHtoUSDRate = fetch(ETH_USD_URL).then((res) => res.json());
    const ETHtoUSDTRate = fetch(ETH_USDT_URL).then((res) => res.json());

    const rates = await Promise.all([
      DAItoUSDRate,
      ETHtoUSDRate,
      ETHtoUSDTRate,
    ]);

    result = (rates[0].price / rates[1].price) * rates[2].price;
  } catch (error) {
    console.error(error);
  }

  return [
    { ...tokenPair.TOKEN_A, price: "-1" } as TTokenPrice,
    { ...tokenPair.TOKEN_B, price: result.toString() } as TTokenPrice,
  ];
};

export const BinanceAPI: TExchangeAPIFacade = {
  getDAIToBTC: async () => getDAIToBTC(),
  getDAIToETH: async () => getDAIToETH(),
  getDAIToUSDT: async () => getDAIToUSDT(),
};
