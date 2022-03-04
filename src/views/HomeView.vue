<script setup lang="ts">
import { h } from "vue";
import { onMounted, onUnmounted, ref, type Ref } from "vue";
import { CRYPTO_ASSETS } from "@/common/assets.constans";
import type { TTokenInfo, TAssetSymbols } from "@/common/types";
import { useCryptoAssetsStore } from "@/stores/cryptoAssets";
import { ElNotification } from "element-plus";

let lastUpdatedAt = ref(new Date());
let timerRef: ReturnType<typeof setInterval>;

const initialAssets: TTokenInfo[] = [CRYPTO_ASSETS.DAI];
const initialAsset: Ref<string> = ref(initialAssets[0].symbol);

const targetAssets: TTokenInfo[] = [];
for (const asset in CRYPTO_ASSETS) {
  if (CRYPTO_ASSETS[asset].symbol !== initialAsset.value) {
    targetAssets.push(CRYPTO_ASSETS[asset]);
  }
}
const targetAsset: Ref<string> = ref(targetAssets[0].symbol);

const initialAmount = ref(1);

const exchanges = useCryptoAssetsStore();

let buyingAsset = ref(false);

const quotesResults = ref(
  exchanges.assetsQuotes[
    (initialAsset.value + targetAsset.value) as TAssetSymbols
  ]
);

const getQuotes = async () => {
  quotesResults.value = await exchanges.fetchAssetQuotes(
    (initialAsset.value + targetAsset.value) as TAssetSymbols
  );
};

const showFeedback = () => {
  buyingAsset.value = true;

  setTimeout(() => {
    buyingAsset.value = false;
    ElNotification({
      title: "Success",
      message: h(
        "i",
        { style: "color: teal" },
        `You have successfully bought ${initialAmount.value}${initialAsset.value} of ${targetAsset.value}`
      ),
    });
  }, 1.5 * 1000);
};

onMounted(() => {
  getQuotes();
  timerRef = setInterval(
    () =>
      getQuotes().then(() => {
        lastUpdatedAt.value = new Date();
      }),
    30 * 1000
  );
});

onUnmounted(() => {
  clearInterval(timerRef);
});
</script>

<template>
  <p>{{ lastUpdatedAt }}</p>
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

    <span>on</span>

    <el-select v-model="targetAsset" placeholder="To" size="large">
      <el-option
        v-for="asset in targetAssets"
        :key="asset.symbol"
        :label="asset.symbol"
        :value="asset.symbol"
      ></el-option>
    </el-select>

    <el-button size="large" type="primary" @click="getQuotes"
      >Get Quotes</el-button
    >
  </el-row>

  <el-table :data="quotesResults" border>
    <el-table-column prop="exchange" label="Exchange" width="120" />
    <el-table-column prop="symbol" label="Symbol" width="64" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="price" label="Price" width="320" />
    <el-table-column fixed="right" width="160">
      <template #default="scope">
        <el-button size="small" @click="showFeedback()" :loading="buyingAsset"
          >Buy from {{ scope.row.exchange }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
