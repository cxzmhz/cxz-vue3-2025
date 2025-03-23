<template>
  <div>{{ counter }}</div>
  <ElButton @click="counter++">click</ElButton>
</template>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
const counter = ref(0);

onMounted(() => {
  console.log('........onMounted');
});

watchEffect(() => {
  console.log('.........effect', counter.value);
});
</script>
