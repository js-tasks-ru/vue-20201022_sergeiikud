<template>
  <div class="toasts">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="toast.className"
      class="toast"
    >
      <app-icon :icon="toast.icon" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',
  components: {
    AppIcon,
  },
  data() {
    return {
      toasts: [],
    };
  },
  methods: {
    getUniqueId() {
      return Date.now() + Math.random();
    },
    scheduleRemoveToast(id, delay) {
      // delay Может быть полезен, когда ошибки и упешные уведомления нужно показывать разное время
      setTimeout(() => {
        this.toasts = this.toasts.filter((toast) => toast.id !== id);
      }, delay);
    },
    addToast(message, isError = true) {
      const id = this.getUniqueId();
      const newToast = {
        id,
        message,
        className: isError ? 'toast_error' : 'toast_success',
        icon: isError ? 'alert-circle' : 'check-circle',
      };
      this.toasts.push(newToast);
      this.scheduleRemoveToast(id, DELAY);
    },
    error(message) {
      this.addToast(message, true);
    },
    success(message) {
      this.addToast(message, false);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
