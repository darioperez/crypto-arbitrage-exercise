<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal">
        <el-menu-item>Arbitrage Exercise</el-menu-item>
        <el-menu-item>Logout</el-menu-item>
      </el-menu>
    </el-header>

    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<style>
@import "@/assets/base.css";
</style>
