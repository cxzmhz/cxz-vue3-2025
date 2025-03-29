/**
 * @fileoverview axios should be used under the dirname of src/api
 * @author axios-under-api
 */
'use strict';
import path from 'path';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// 将文件路径转换成“/”分割的格式
function normalizePath(filePath) {
  return path
    .resolve(filePath)
    .replace(/\\/g, '/') // 统一分隔符
    .replace(/\/+$/, ''); // 移除末尾斜杠（可选）
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'axios should be used under the dirname of src/api',
      recommended: true,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          allowedPath: {
            type: 'string',
          },
        },
        additionalProperties: false, // 用于控制是否允许在配置文件中定义未知的属性，如果将`additionalProperties`设置为`false`，那么 ESLint 会在发现未知属性时抛出一个错误。这意味着您必须在配置文件中使用已知的属性，否则 ESLint 将不会接受配置文件。
      },
    ], // Add a schema if the rule has options
    messages: {
      axiosUnderApi: 'axios should be used under the dirname of src/api',
    }, // Add messageId and message
  },

  create(context) {
    // 当前文件所在的绝对路径
    const filePath = normalizePath(context.filename);
    // 获取上面schema里面所定义的参数
    const options = context.options[0] || {};
    // 允许的路径
    const allowedPath = options.allowedPath || 'src\/api';
    // 允许的路径的绝对路径
    const allowedAbsolutePath = normalizePath(`${process.cwd()}/${allowedPath}`);
    // 判断当前文件是否在允许的路径下
    const isAllowed = filePath.startsWith(allowedAbsolutePath);

    if (!isAllowed) {
      return {
        // 检测 import 语句，是不是从'axios'里面导出的
        ImportDeclaration(node) {
          if (node.source.value === 'axios') {
            context.report({
              node,
              messageId: 'axiosUnderApi',
            });
          }
        },
        CallExpression(node) {
          // 获取调用当前函数的对象名，如：axios.get()，就是获取axios
          const curObjName = node.callee?.object?.name;
          // 获取调用当前函数的函数名，如：axios({})，就是获取axios
          const curName = node.callee?.name;
          if (curObjName === 'axios' || curName === 'axios') {
            context.report({
              node,
              messageId: 'axiosUnderApi',
            });
          }
        },
      };
    }

    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
    };
  },
};
