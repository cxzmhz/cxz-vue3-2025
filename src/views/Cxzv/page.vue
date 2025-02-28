<script setup lang="ts">
const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
});
const { msg } = props;
</script>
<template>
  <div>{{ msg }}</div>
</template>
