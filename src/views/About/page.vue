<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
const CxzComp1 = defineAsyncComponent(() => import('@/components/CxzComp1.vue'));
const isShow = ref<boolean>(true);
const handleChild = () => {
  isShow.value = !isShow.value;
};
</script>
<template>
  <div class="about">
    <button @click="handleChild">显示或隐藏子组件</button>
    <CxzComp1 v-if="isShow" />
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (width >= 1024px) {
  .about {
    display: flex;
    align-items: center;
    min-height: 100vh;
  }
}
</style>
