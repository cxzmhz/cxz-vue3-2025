<template>
  <div>
    <slot />
    <el-form :model="form" label-width="auto" :inline="true" class="searchForm">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" value="male" />
          <el-option label="女" value="female" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="form.age" :min="0" :max="100" controls-position="right" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
const props = defineProps<{
  getTableData: () => void;
}>();
const emit = defineEmits(['refresh-table']);

const form = reactive({
  name: '',
  gender: 'male',
  age: 0,
});

const onSubmit = () => {
  console.log('submit!');
  console.log('.....formdata', form);
  props.getTableData();
  emit('refresh-table');
};

const onCancel = () => {
  console.log('cancel!');
};
</script>

<style lang="less" scoped>
.searchForm {
  .el-input {
    --el-input-width: 220px;
  }

  .el-select {
    --el-select-width: 220px;
  }
}
</style>
