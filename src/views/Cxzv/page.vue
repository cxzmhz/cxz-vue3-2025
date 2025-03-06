<template>
  <div class="formView">
    <div class="headerWrap">
      <SearchComp :getTableData="getTableData" @refresh-table="handleRefresh"
        ><h2>表单表格组件测试</h2></SearchComp
      >
      <el-button type="primary" @click="onAdd" :style="{ marginBottom: '15px' }">新建</el-button>
      <el-button type="primary" @click="testRequest" :style="{ marginBottom: '15px' }"
        >测试请求</el-button
      >
    </div>
    <div class="contentWarp">
      <TableComp
        :table-data="tableData"
        :page-data="pageData"
        :getTableData="getTableData"
        :editForm="editForm"
      ></TableComp>
    </div>
  </div>
  <EditForm ref="editFormRef" :detail="detail"></EditForm>
</template>

<script setup lang="ts">
import SearchComp from './components/SearchComp.vue';
import TableComp from './components/TableComp.vue';
import EditForm from './components/EditForm.vue';
import { type PageData, type TableDataType, type TableDataTypeItem } from './types.ts';
import { ref } from 'vue';
import { request } from '@/request/request';

const tableData = ref<TableDataType>([]);
const pageData = ref<PageData>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

const detail = ref<TableDataTypeItem>();

const editFormRef = ref<InstanceType<typeof EditForm> | null>(null);

const handleRefresh = () => {
  console.log('refresh');
};
const onAdd = () => {
  editFormRef.value?.onOpen();
  console.log('新建');
};

const editForm = (formData: TableDataTypeItem) => {
  console.log('....editForm', formData);
  detail.value = formData;
  editFormRef.value?.onOpen(formData);
};

const getTableData = () => {
  tableData.value = [
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'John Brown',
      age: Math.floor(Math.random() * 100),
      gender: '男',
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: 'Jim Green',
      age: Math.floor(Math.random() * 100),
      gender: '女',
    },
    {
      id: Math.floor(Math.random() * 100).toString(),
      name: '陈陈陈',
      age: Math.floor(Math.random() * 100),
      gender: '男',
    },
  ];
  pageData.value = {
    currentPage: 1,
    pageSize: 10,
    total: tableData.value.length,
  };
};

getTableData();

// const testRequest = async () => {
//   const res = await request.post<{
//     code: number;
//     message: string;
//     data: unknown;
//   }>('/postUsers', {
//     name: 'cxz',
//   });
//   console.log('.............res', res);
// };
const testRequest = async () => {
  const res = await request.get<{
    code: number;
    message: string;
    data: unknown;
  }>('/topics', {
    params: {},
  });
  console.log('.............res', res);
};
</script>

<style lang="less" scoped>
.headerWrap {
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 40px);
}
</style>
