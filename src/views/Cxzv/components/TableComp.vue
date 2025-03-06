<template>
  <div class="tableWrap">
    <el-table :data="tableData" border style="width: 100%; margin-bottom: 20px">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="name" label="名字" width="180" />
      <el-table-column prop="gender" label="性别" width="180" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { PageData, TableDataType, TableDataTypeItem } from '../types';

const props = defineProps<{
  tableData: TableDataType;
  pageData: PageData;
  getTableData: () => void;
  editForm: (formData: TableDataTypeItem) => void;
}>();

const { currentPage, pageSize, total } = props.pageData;
const handleSizeChange = (size: number) => {
  console.log(size);
  props.getTableData();
};

const handleCurrentChange = (currentPage: number) => {
  console.log(currentPage);
  props.getTableData();
};

const handleEdit = (row: TableDataTypeItem) => {
  console.log('....row', row);
  props.editForm(row);
};

console.log('....props', props);
</script>
<style lang="less" scoped>
.tableWrap {
  width: calc(100vw - 40px);
}
</style>
