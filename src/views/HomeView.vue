<script setup lang="ts">
import { ref, type Ref } from "vue";
import { UniswapAPI } from "@/api";
import { CRYPTO_ASSETS } from "@/common/assets.constans";
import type { TTokenInfo } from "@/common/types";

const initialAssets: TTokenInfo[] = [CRYPTO_ASSETS.DAI];
const initialAsset: Ref<TTokenInfo> = ref(initialAssets[0]);

const targetAssets: TTokenInfo[] = [];
for (const asset in CRYPTO_ASSETS) {
  if (CRYPTO_ASSETS[asset].symbol !== initialAsset.value.symbol) {
    targetAssets.push(CRYPTO_ASSETS[asset]);
  }
}
const targetAsset: Ref<TTokenInfo> = ref(targetAssets[0]);

const initialAmount = ref(1);

const quotesResults = ref([CRYPTO_ASSETS.BTC]);

UniswapAPI.getDAIToBTC().then((tokens) => {
  quotesResults.value[0] = tokens[1];
  console.log(1, tokens[0].symbol, "=", tokens[1].price, tokens[1].symbol);
});
UniswapAPI.getDAIToETH().then((tokens) => {
  console.log(1, tokens[0].symbol, "=", tokens[1].price, tokens[1].symbol);
});
</script>

<template>
  <el-form :inline="true">
    <el-row :gutter="24" justify="center">
      <el-input-number
        v-model="initialAmount"
        placeholder="Initial Amount"
        :min="0"
        :controls="false"
        size="large"
      />

      <el-select v-model="initialAsset" placeholder="From" size="large">
        <el-option
          v-for="asset in initialAssets"
          :key="asset.symbol"
          :label="asset.symbol"
          :value="asset.symbol"
        ></el-option>
      </el-select>

      <el-select v-model="targetAsset" placeholder="To" size="large">
        <el-option
          v-for="asset in targetAssets"
          :key="asset.symbol"
          :label="asset.symbol"
          :value="asset.symbol"
        ></el-option>
      </el-select>

      <el-button size="large" type="primary">Get Quotes</el-button>
    </el-row>
  </el-form>

  <el-table :data="quotesResults" border>
    <el-table-column prop="symbol" label="Symbol" width="56" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="price" label="Price" width="320" />
    <el-table-column fixed="right" width="160">
      <template #default>
        <el-button size="small">Buy from XXXXXX</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
