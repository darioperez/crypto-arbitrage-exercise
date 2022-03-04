<script setup lang="ts">
import { h } from "vue";
import { onMounted, onUnmounted, ref, type Ref } from "vue";
import { CRYPTO_ASSETS } from "@/common/assets.constans";
import type { TTokenInfo } from "@/common/types";
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

const DAIBTCQuotes = ref(exchanges.assetsQuotes["DAIBTC"]);
const DAIETHQuotes = ref(exchanges.assetsQuotes["DAIETH"]);
const DAIUSDTQuotes = ref(exchanges.assetsQuotes["DAIUSDT"]);

const getQuotes = async () => {
  DAIBTCQuotes.value = await exchanges
    .fetchAssetQuotes("DAIBTC")
    .then((quotes) => {
      return quotes.sort((a, b) => (a.price <= b.price ? -1 : 1));
    });
  DAIETHQuotes.value = await exchanges
    .fetchAssetQuotes("DAIETH")
    .then((quotes) => {
      return quotes.sort((a, b) => (a.price <= b.price ? -1 : 1));
    });
  DAIUSDTQuotes.value = await exchanges
    .fetchAssetQuotes("DAIUSDT")
    .then((quotes) => {
      return quotes.sort((a, b) => (a.price <= b.price ? -1 : 1));
    });
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
  <div class="arb-view--home">
    <el-row :gutter="24">
      <el-col :span="12">
        <h3>DAI/BTC</h3>
        <!-- Quotes Table: DAIBTC -->
        <el-table :data="DAIBTCQuotes" border>
          <el-table-column prop="exchange" label="Exchange" width="120" />
          <el-table-column prop="price" label="Price" />
          <el-table-column fixed="right" width="160">
            <template #default="scope">
              <el-button
                size="small"
                @click="showFeedback()"
                :loading="buyingAsset"
                >Buy from {{ scope.row.exchange }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!--/ Quotes Table: DAIBTC -->
      </el-col>

      <el-col :span="12">
        <h3>DAI/ETH</h3>
        <!-- Quotes Table: DAIETH -->
        <el-table :data="exchanges.assetsQuotes['DAIETH']" border>
          <el-table-column prop="exchange" label="Exchange" width="120" />
          <el-table-column prop="price" label="Price" />
          <el-table-column fixed="right" width="160">
            <template #default="scope">
              <el-button
                size="small"
                @click="showFeedback()"
                :loading="buyingAsset"
                >Buy from {{ scope.row.exchange }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!--/ Quotes Table: DAIETH -->
      </el-col>

      <el-col :span="12">
        <h3>DAI/USDT</h3>
        <!-- Quotes Table: DAIUSDT -->
        <el-table :data="exchanges.assetsQuotes['DAIUSDT']" border>
          <el-table-column prop="exchange" label="Exchange" width="120" />
          <el-table-column prop="price" label="Price" />
          <el-table-column fixed="right" width="160">
            <template #default="scope">
              <el-button
                size="small"
                @click="showFeedback()"
                :loading="buyingAsset"
                >Buy from {{ scope.row.exchange }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!--/ Quotes Table: DAIUSDT -->
      </el-col>
    </el-row>

    <p>Last updated at {{ lastUpdatedAt }}</p>
  </div>
</template>

<style>
.arb-view--home {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
