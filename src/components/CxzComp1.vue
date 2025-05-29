<template>
  <div id="cxzcomp1">
    <button @click="increment">{{ count }}</button>
    <div>{{ finalPriceBetter }}</div>
    <div id="testlose">测试内存泄漏21</div>
  </div>
</template>
<script setup lang="ts">
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  shallowRef,
  watch,
} from 'vue';
// import HelloWorld from './HelloWorld.vue'
const nonReactiveData = shallowRef({ count: 0 }); // 非响应式（开销较小）
console.log(nonReactiveData);
const count = ref(0);

const user = ref({ name: 'Alice', age: 25 });

// ❌ 不推荐：深度监听整个对象
watch(
  user,
  (newVal, oldVal) => {
    console.log('User changed:', newVal, oldVal);
  },
  { deep: true },
);

// ✅ 推荐：仅监听必要的属性
watch(
  () => user.value.name,
  (newVal, oldVal) => {
    console.log('User name changed:', newVal, oldVal);
  },
);

onBeforeMount(() => {
  console.log('子组件beforeMounted');
});

onMounted(() => {
  console.log('子组件mounted');
});

onBeforeUpdate(() => {
  console.log('子组件onBeforeUpdate');
});

onUpdated(() => {
  console.log('子组件onUpdated');
});

onBeforeUnmount(() => {
  console.log('子组件onBeforeUnmount');
});

onUnmounted(() => {
  console.log('子组件onUnmounted');
});

// computed 的使用举例
const price = ref(100);
const discount = ref(0.9);
// ❌ 不推荐：修改原始数据
// const finalPrice = computed(() => {
//   price.value *= discount.value // 会引起不必要的响应式追踪
//   return price.value
// })

// // ✅ 推荐：返回新计算值
const finalPriceBetter = computed(() => price.value * discount.value);

const increment = () => {
  const tttt = document.getElementById('testlose');
  document.getElementById('cxzcomp1')!.removeChild(tttt!); // 即使testlose这个dom被移除了，但是js的v8引擎对blink渲染引擎里面的这个dom的引用的存在使得2个引擎都不知道要不要释放这块的内存，导致2个引擎里面的dom内容都无法释放，造成内存泄漏
  count.value++;
};
console.log(finalPriceBetter.value);
</script>
