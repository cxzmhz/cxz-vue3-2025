<template>
  <div>
    <slot />
    <el-form :model="form" :inline="true" class="searchForm">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="性别" v-show="showGender">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" value="male" />
          <el-option label="女" value="female" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" v-if="testModel">
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
import { onMounted, reactive } from 'vue';
const { testModel = false, getTableData } = defineProps<{
  testModel: boolean;
  getTableData: () => void;
}>();
const showGender = defineModel('showGender');

// 通过props中声明v-model的变量，在通过“update:变量名”的方式去触发父组件传进来的属性值的修改，这个是vue3.4之前的写法，3.5之后可以直接使用defineModel("变量名")来处理
const emit = defineEmits<{
  (event: 'refresh-table'): void;
  (event: 'cancel'): void;
  (event: 'update:testModel', testModel: boolean): void;
  (event: 'update:showGender', testModel: boolean): void;
}>();
// const emit = defineEmits(['refresh-table', 'cancel']); // 这2种声明emit的方式都是可以的

const form = reactive({
  name: '',
  gender: 'male',
  age: 0,
});

onMounted(() => {
  console.log('........searchcomp-onMounted');
});

const onSubmit = () => {
  console.log('submit!');
  console.log('.....formdata', form);
  getTableData();
  emit('refresh-table');
  emit('cancel');
};

const onCancel = () => {
  console.log('cancel!');
  emit('update:testModel', true);
  emit('update:showGender', true);
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
