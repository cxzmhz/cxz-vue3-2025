<template>
  <div class="formView">
    <div class="headerWrap">
      <SearchComp :getTableData="getTableData" @refresh-table="handleRefresh" @cancel="handleCancel"
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
  <div class="piniaTest">
    这个数据来自 pinia
    {{ counterStore.doubleCount }}
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
import { useCounterStore } from '@/stores/counter';

// 测试pinia的使用
const counterStore = useCounterStore();

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

const handleCancel = () => {
  console.log('cancel');
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

// web worker 的使用举例
// 使用URL构造器确保正确路径
console.log('..........import.meta', import.meta);
const worker = new Worker(
  new URL('@/workers/worker.ts', import.meta.url),
  { type: 'module' }, // 如果需要使用ES模块
);

// 发送消息
worker.postMessage({ num: 40 });

// 接收消息
worker.onmessage = (event) => {
  console.log('计算结果:', event.data);
};

// 错误处理
worker.onerror = (error) => {
  console.error('Worker error:', error);
};

// 这里的toSmallCase方法在custom.d.ts中已经声明过了，所以ts不会报错
// String.prototype.toSmallCase = function () {
//   return this.toLowerCase();
// };
// const str = 'aaB';
// console.log(str.toSmallCase());

// 这里custom.d.ts中已经声明过了，不需要再使用let声明了，重新赋值就可以了，但在模块里面这么使用是不符合规范的，因为这样子就相当于是直接定义一个全局变量了，会报错
// logMessage = function (message) {
//   console.log(message);
// };
// logMessage('aa');

// 这里custom.d.ts中已经声明过了，不需要再使用let声明了，重新赋值就可以了，但在模块里面这么使用是不符合规范的，因为这样子就相当于是直接定义一个全局变量了，会报错
// logVar = 'aaa';
// console.log(logVar);
</script>

<style lang="less" scoped>
.headerWrap {
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 40px);
}

.piniaTest {
  margin-top: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
