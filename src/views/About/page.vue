<template>
  <div class="about">
    <div class="child-visi">
      <el-button type="primary" @click="handleChildVisi">显示或隐藏子组件</el-button>
      <CxzComp1 v-if="isShow" />
    </div>
    <div>
      <el-button
        type="primary"
        @click="changeStroeCount"
        :style="{ marginBottom: '15px', marginTop: '15px' }"
        >改变store里面的count的值</el-button
      >
      这个数据来自 pinia
      {{ counterStore.count }}
    </div>
    <RouterLink to="/cxzv">/cxzv</RouterLink>
  </div>
</template>

<script setup lang="ts">
import {
  defineAsyncComponent,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from 'vue';
import { useCounterStore } from '@/stores/counter';

// 测试pinia的使用
const counterStore = useCounterStore();
const changeStroeCount = () => {
  // counterStore.increment();
  counterStore.count++;
};

onBeforeMount(() => {
  console.log('父组件beforeMounted');
});

onMounted(() => {
  console.log('父组件mounted');
});

onBeforeUpdate(() => {
  console.log('父组件onBeforeUpdate');
});

onUpdated(() => {
  console.log('父组件onUpdated');
});

onBeforeUnmount(() => {
  console.log('父组件onBeforeUnmount');
});

onUnmounted(() => {
  console.log('父组件onUnmounted');
});

// 测试一部组件的使用
const CxzComp1 = defineAsyncComponent(() => import('@/components/CxzComp1.vue'));
const isShow = ref<boolean>(true);
const handleChildVisi = () => {
  isShow.value = !isShow.value;
};
</script>

<style lang="less" scoped>
.about {
  min-height: 100vh;

  .child-visi {
    display: flex;
    align-items: center;
  }
}
</style>
