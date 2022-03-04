<script setup lang="ts">
import { RouterView } from "vue-router";
import { Aim, Wallet, User } from "@element-plus/icons-vue";
</script>

<template>
  <el-container>
    <el-header class="arb-header">
      <el-menu mode="horizontal" class="arb-menu">
        <el-row>
          <el-menu-item class="arb-mr-auto">
            <el-icon :size="24">
              <aim />
            </el-icon>
            Crypto Aim Bot
          </el-menu-item>
        </el-row>

        <el-row align="middle">
          <el-button type="info" disabled>
            <el-icon class="arb-mr-sm"><wallet /></el-icon>
            Connect Wallet <i>(soon)</i>
          </el-button>

          <el-menu-item>
            <el-icon><user /></el-icon>
            Preferences
          </el-menu-item>
        </el-row>
      </el-menu>
    </el-header>

    <el-main>
      <RouterView />
    </el-main>

    <el-footer> </el-footer>
  </el-container>
</template>

<style>
@import "@/assets/base.css";

.arb-header {
  margin: 0;
  padding: 0;
}

.arb-menu {
  justify-content: space-between;
}
</style>
