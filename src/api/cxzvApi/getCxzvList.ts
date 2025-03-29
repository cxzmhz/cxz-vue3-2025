import { axios } from '@/api/request/request';

export const getCxzvList = async () => {
  const res = await axios.get<{
    code: number;
    message: string;
    data: unknown;
  }>('/topics', {
    params: {},
  });
  return res;
};
