<template>
  <el-dialog v-model="visible" title="Tips" width="500">
    <el-form
      :model="form"
      label-width="auto"
      class="searchForm"
      :rules="rules"
      ref="formRef"
      status-icon
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" value="male" />
          <el-option label="女" value="female" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age" :min="0" :max="100" controls-position="right" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
import type { TableDataTypeItem } from '../types';

const { detail } = defineProps<{
  detail?: TableDataTypeItem;
}>();

const visible = ref(false);
const formRef = ref<FormInstance>();

const form = reactive({
  name: '',
  gender: 'male',
  age: 0,
});

const rules = reactive<FormRules<Omit<TableDataTypeItem, 'id'>>>({
  name: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'change',
    },
  ],
  gender: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change',
    },
  ],
  age: [
    {
      required: true,
      message: '请输入年龄',
      trigger: 'change',
    },
  ],
});
const onClose = () => {
  if (formRef.value) {
    formRef.value?.resetFields();
  }
  visible.value = false;
};
const handleConfirm = () => {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      let params = form;
      if (detail) {
        params = { ...detail, ...form };
      }
      console.log('.......params', params);
      ElMessage.success('提交成功');
      onClose();
    } else {
      ElMessage.error('请完善表单');
    }
  });
};
const onOpen = (formData?: TableDataTypeItem) => {
  if (formData) {
    form.name = formData.name || '';
    form.gender = formData.gender || 'male';
    form.age = formData.age || 0;
  }
  visible.value = true;
};

defineExpose({
  onOpen,
  onClose,
});
</script>
