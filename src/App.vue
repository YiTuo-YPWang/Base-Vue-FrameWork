<template>
  <a-config-provider :locale="zhCN">
    <Home v-if="!isLogin"></Home>
    <router-view v-else />
  </a-config-provider>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Home from '@/views/home.vue';
import { isNewVersion } from './utils/version';

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && import.meta.env.MODE === 'prod') {
    isNewVersion();
  }
});

const route = useRoute();

const isLogin = computed(() => {
  return route.name === null || route.name === 'login';
});
</script>
<style lang="scss" scoped></style>
