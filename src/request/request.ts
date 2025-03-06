import Axios, { type AxiosResponse } from 'axios';
import { whiteList, StatusCode, errorWhiteList } from './whiteList';

export const request = Axios.create({
  // 会以正常状态返回错误码
  validateStatus: function (status) {
    return whiteList.indexOf(status) > -1 || errorWhiteList.indexOf(status) > -1;
  },

  // 请求超时时间
  timeout: 5000,
});

// 加入自定义前缀 用于反向代理
request.defaults.baseURL = '/api';

export interface ResponseData<T = unknown> {
  code: number;
  data: T;
  message: string;
}

// session失效，清除用户信息并返回登录界面
const clearAll = () => {
  // store.dispatch({
  //   type: reset.name
  // });
};

request.interceptors.response.use((response: AxiosResponse<ResponseData<unknown>>) => {
  // 过期时清空缓存 回到登录页面
  if (
    +response.status === StatusCode.STATUS_401 ||
    response.data?.code === StatusCode.STATUS_100401
  ) {
    clearAll();
    throw new Error('您的登录状态可能过期了');
  }
  return response;
});

// post请求示例
// export async function postToCreatePlan(params: PlanItem): Promise<null> {
//   const { data: rspData } = await axiosInstance.post<{
//     code: number;
//     data: null;
//     message: string;
//   }>(planList.createPlan, params);
//   const { code, data, message } = rspData;
//   if (code !== 200) {
//     throw new Error(message || '创建计划失败');
//   }
//   return data;
// }

// get请求示例
// export default async function getCommunityList(params: GetCommunityListParams = {}) {
//   const res = await axiosInstance.get<{
//     code: number;
//     message: string;
//     data: Community[];
//   }>(apiPath, {
//     params
//   });
//   const { code, message, data } = res.data;
//   if (code !== 200) {
//     throw new Error(message);
//   }
//   return data;
// }
