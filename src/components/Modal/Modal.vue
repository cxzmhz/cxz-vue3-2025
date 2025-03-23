<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="modal-mask"
        @click.self="maskClosable && handleClose()"
        role="dialog"
        aria-labelledby="modalTitle"
      >
        <div class="modal-container" :style="{ width: width + 'px' }">
          <div class="modal-header">
            <slot name="header">
              <h2 id="modalTitle">{{ title }}</h2>
            </slot>
            <button v-if="showClose" class="close-btn" @click="handleClose" aria-label="关闭弹窗">
              ×
            </button>
          </div>

          <div class="modal-body">
            <slot>
              <Content v-if="typeof content === 'function'" :render="content" />
              <template v-else>{{ content }}</template>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button @click="handleCancel">{{ cancelText }}</button>
              <button @click="handleConfirm">{{ confirmText }}</button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { h, onMounted, onUnmounted } from 'vue';
import { type RenderFnType } from './modal.ts';

// 可以通过withDefaults来定义默认值
const {
  modelValue = true,
  title = '提示',
  width = 520,
  maskClosable = true,
  showClose = true,
  content = '',
  confirmText = '确定',
  cancelText = '取消',
} = defineProps<{
  modelValue: boolean;
  title?: string;
  width?: number;
  maskClosable?: boolean;
  showClose?: boolean;
  content?: string | RenderFnType;
  confirmText?: string;
  cancelText?: string;
}>();

// const props = defineProps({
//   modelValue: { type: Boolean, required: true },
//   title: { type: String, default: '提示' },
//   width: { type: Number, default: 520 },
//   maskClosable: { type: Boolean, default: true },
//   showClose: { type: Boolean, default: true },
//   content: { type: [String, Function], default: '' },
//   confirmText: { type: String, default: '确定' },
//   cancelText: { type: String, default: '取消' },
// });

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

// 内容渲染组件
const Content = (props: { render: RenderFnType }) => props.render(h);

const handleClose = () => {
  console.log('.......');
  emit('update:modelValue', false);
};

const handleConfirm = () => {
  emit('confirm');
  handleClose();
};

const handleCancel = () => {
  emit('cancel');
  handleClose();
};

// ESC 关闭监听
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && modelValue) handleClose();
};

// 生命周期处理
onMounted(() => document.addEventListener('keydown', onKeydown));
onUnmounted(() => document.removeEventListener('keydown', onKeydown));
</script>

<style scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 50%);
}

.modal-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgb(0 0 0 / 15%);
  animation: slideIn 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
}

.modal-body {
  max-height: 60vh;
  padding: 24px;
  overflow-y: auto;
}

.modal-footer {
  padding: 16px 24px;
  text-align: right;
  border-top: 1px solid #eee;
}

.close-btn {
  padding: 0 8px;
  font-size: 24px;
  cursor: pointer;
  background: none;
  border: none;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-leave-to {
  opacity: 1;
}

.fade-enter-from {
  opacity: 0;
}
</style>
