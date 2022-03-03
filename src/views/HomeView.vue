<script setup lang="ts">
import TheWelcome from "@/components/TheWelcome.vue";
import { UniswapAPI } from "@/api";

UniswapAPI.getDAIToBTC().then((tokens) => {
  console.log(1, tokens[0].symbol, "=", tokens[1].price, tokens[1].symbol);
});
UniswapAPI.getDAIToETH().then((tokens) => {
  console.log(1, tokens[0].symbol, "=", tokens[1].price, tokens[1].symbol);
});
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
