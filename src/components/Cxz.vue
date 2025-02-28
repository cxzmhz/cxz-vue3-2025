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
  <div class="msg">{{ msg }}</div>
</template>
<style lang="less" scoped>
.msg {
  color: red;
}

.title {
  font-weight: bold;

  .msg {
    font-weight: bold;
  }
}
</style>
