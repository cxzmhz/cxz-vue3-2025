<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue';
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

// computed 的使用举例
// const price = ref(100)
// const discount = ref(0.9)
// ❌ 不推荐：修改原始数据
// const finalPrice = computed(() => {
//   price.value *= discount.value // 会引起不必要的响应式追踪
//   return price.value
// })

// // ✅ 推荐：返回新计算值
// const finalPriceBetter = computed(() => price.value * discount.value)

const increment = () => {
  count.value++;
};
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
