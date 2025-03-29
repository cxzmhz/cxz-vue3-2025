/*
 * @Ddescription: 不是错误的返回码
 * @Author: pengzhou
 * @Date: 2022-04-19 15:13:22
 * @LastEditTime: 2022-07-28 12:22:41
 */

export enum StatusCode {
  // 接口正常返回码
  STATUS_200 = 200,
  // 表示手机号码存在且设置密码
  STATUS_100004 = 100004,
  // 表示手机号码存在且没设置密码
  STATUS_100005 = 100005,
  // 401为session过期
  STATUS_401 = 401,
  // 100401为后端约定的过期code
  STATUS_100401 = 100401,
  // 后端服务不可用
  STATUS_503 = 503,
  // 表示账号被禁用
  STATUS_100403 = 100403,
  // 密码过期
  STATUS_100501 = 100501,
  // 密码输错超过最大限制
  STATUS_100502 = 100502,
  // 越权的请求
  STATUS_100416 = 100416,
}

// 会以正常状态返回错误码的白名单
export const whiteList = [
  StatusCode.STATUS_200,
  StatusCode.STATUS_100004,
  StatusCode.STATUS_100005,
  StatusCode.STATUS_401,
];

// 会以不正常状态返回错误码的白名单
export const errorWhiteList = [StatusCode.STATUS_503];
