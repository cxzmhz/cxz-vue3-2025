<template>
  <div class="homeBox">
    <div>当前页面的路径有：</div>
    <p class="routeItem" v-for="(item, index) in routers" :key="index">
      <RouterLink :to="item">{{ item }}</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { getRouterCache } from '@/router';
import { onMounted, ref } from 'vue';
const routers = ref<string[]>([]);

onMounted(() => {
  routers.value = getRouterCache();
});
</script>

<style lang="less" scoped>
.homeBox {
  padding: 20px;
  font-size: 20px;

  .routeItem {
    cursor: pointer;
  }
}
</style>
