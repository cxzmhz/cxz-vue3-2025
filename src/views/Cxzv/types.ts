export type TableDataTypeItem = {
  id: string;
  name?: string;
  age?: number;
  gender: string;
};

export type TableDataType = TableDataTypeItem[];

export type PageData = {
  currentPage: number;
  pageSize: number;
  total: number;
};
