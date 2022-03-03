import { ethers } from "ethers";
import { Pool } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";
import { abi as IUniswapV3PoolABI } from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json";
import type {
  TExchangeAPIFacade,
  TTokenPair,
  TTokenPrice,
} from "@/common/types";
import { UNISWAP_ASSET_PAIRS } from "@/common/assets.constans";

const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/d25fab8e24d84da1b5a12321aba43985"
);

interface Immutables {
  factory: string;
  token0: string;
  token1: string;
  fee: number;
  tickSpacing: number;
  maxLiquidityPerTick: ethers.BigNumber;
}

interface State {
  liquidity: ethers.BigNumber;
  sqrtPriceX96: ethers.BigNumber;
  tick: number;
  observationIndex: number;
  observationCardinality: number;
  observationCardinalityNext: number;
  feeProtocol: number;
  unlocked: boolean;
}

const getTokensPrices = async (
  tokenPair: TTokenPair
): Promise<[TTokenPrice, TTokenPrice]> => {
  const poolAddress = tokenPair.POOL_ADDRESS;
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  );

  async function getPoolImmutables() {
    const [factory, token0, token1, fee, tickSpacing, maxLiquidityPerTick] =
      await Promise.all([
        poolContract.factory(),
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
        poolContract.tickSpacing(),
        poolContract.maxLiquidityPerTick(),
      ]);

    const immutables: Immutables = {
      factory,
      token0,
      token1,
      fee,
      tickSpacing,
      maxLiquidityPerTick,
    };
    return immutables;
  }

  getPoolImmutables().then(() => {
    // TODO: Do something
  });

  async function getPoolState() {
    const [liquidity, slot] = await Promise.all([
      poolContract.liquidity(),
      poolContract.slot0(),
    ]);

    const PoolState: State = {
      liquidity,
      sqrtPriceX96: slot[0],
      tick: slot[1],
      observationIndex: slot[2],
      observationCardinality: slot[3],
      observationCardinalityNext: slot[4],
      feeProtocol: slot[5],
      unlocked: slot[6],
    };

    return PoolState;
  }

  const [immutables, state] = await Promise.all([
    getPoolImmutables(),
    getPoolState(),
  ]);

  const token0 = new Token(
    3,
    immutables.token0,
    tokenPair.TOKEN_A.decimals,
    tokenPair.TOKEN_A.symbol,
    tokenPair.TOKEN_A.name
  );

  const token1 = new Token(
    3,
    immutables.token1,
    tokenPair.TOKEN_B.decimals,
    tokenPair.TOKEN_B.symbol,
    tokenPair.TOKEN_B.name
  );

  const poolExample = new Pool(
    token0,
    token1,
    immutables.fee,
    state.sqrtPriceX96.toString(),
    state.liquidity.toString(),
    state.tick
  );
  const tokenAPrice = poolExample.token0Price.toSignificant();
  const tokenBPrice = poolExample.token1Price.toSignificant();

  return [
    { ...tokenPair.TOKEN_A, price: tokenAPrice } as TTokenPrice,
    { ...tokenPair.TOKEN_B, price: tokenBPrice } as TTokenPrice,
  ];
};

export const UniswapAPI: TExchangeAPIFacade = {
  getDAIToBTC: async () => getTokensPrices(UNISWAP_ASSET_PAIRS.DAI_BTC),
  getDAIToETH: async () => {
    const [eth, dai] = await getTokensPrices(UNISWAP_ASSET_PAIRS.ETH_DAI);
    return [dai, eth];
  },
  getDAIToUSDT: async () => getTokensPrices(UNISWAP_ASSET_PAIRS.DAI_USDT),
};
