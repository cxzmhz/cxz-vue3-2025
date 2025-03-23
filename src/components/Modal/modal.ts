import { createVNode, h, render } from 'vue';
import Modal from './Modal.vue';
export type RenderHType = typeof h;
export type RenderFnType = (h: RenderHType) => ReturnType<RenderHType>;
type GetParamsType<T> = T extends (params: infer R) => unknown ? R : never; // 获取函数的第一个参数的类型
export type RenderFnParamsType = GetParamsType<RenderFnType>;

type ModalConfig = {
  title?: string;
  content: string | ((h: RenderHType) => ReturnType<typeof h>);
  width?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const useModal = () => {
  const createModal = (config: ModalConfig) => {
    const container = document.createElement('div');
    const close = () => {
      // app.unmount();
      render(null, container);
      container.parentNode?.removeChild(container);
    };

    const vnode = createVNode(Modal, {
      modelValue: true,
      title: config.title,
      width: config.width,
      content: config.content,
      'onUpdate:modelValue': close,
      onConfirm: () => {
        config.onConfirm?.();
        close();
      },
      onCancel: () => {
        config.onCancel?.();
        close();
      },
    });

    // createApp因为是直接创建了一个vue实例，有完整的状态和生命周期，比较耗性能，所以使用createVNode创建vnode的方式来渲染modal
    // const app = createApp({
    //   render() {
    //     return h(Modal, {
    //       modelValue: true,
    //       title: config.title,
    //       width: config.width,
    //       content: config.content,
    //       'onUpdate:modelValue': close,
    //       onConfirm: () => {
    //         config.onConfirm?.();
    //         close();
    //       },
    //       onCancel: () => {
    //         config.onCancel?.();
    //         close();
    //       },
    //     });
    //   },
    // });
    // app.unmount(container);
    // 虽然这里也可以直接render(vnode, document.body)，但是render到container比较可控，虽然因为teleport标签也直接设置的渲染到body上，以至于实际上还是渲染到body上，
    // 但是这样写可以通过render(null, container);来销毁modal
    render(vnode, container);
    document.body.appendChild(container);
  };

  return { show: createModal };
};
