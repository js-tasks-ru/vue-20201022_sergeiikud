<template>
  <div class="dropdown" :class="isShowClass">
    <button
      type="button"
      class="button dropdown__toggle"
      :class="{ dropdown__toggle_icon: isContainIcons }"
      @click="toggleDropdown"
    >
      <app-icon v-if="selectedItemIcon" :icon="selectedItemIcon" />
      {{ displaySelectedText }}
    </button>

    <div class="dropdown__menu" :class="isShowClass">
      <button
        v-for="item in options"
        :key="item.value"
        :class="{ dropdown__item_icon: isContainIcons }"
        class="dropdown__item"
        type="button"
        @click="selectItem(item.value)"
      >
        <app-icon v-if="item.icon" :icon="item.icon" />
        {{ item.text }}
      </button>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

export default {
  name: 'DropdownButton',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
  },
  components: {
    AppIcon,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {
      isOpened: false,
    };
  },
  computed: {
    isShowClass() {
      return this.isOpened ? 'show' : null;
    },
    selectedItem() {
      return this.options.find((el) => el.value === this.value);
    },
    selectedItemIcon() {
      return (this.selectedItem && this.selectedItem.icon) || null;
    },
    displaySelectedText() {
      return this.selectedItem && this.selectedItem.text
        ? `${this.title} - ${this.selectedItem.text}`
        : this.title;
    },
    isContainIcons() {
      return this.options.some((el) => el.icon);
    },
  },
  methods: {
    selectItem(value) {
      this.$emit('change', value);
      this.isOpened = false;
    },
    toggleDropdown() {
      this.isOpened = !this.isOpened;
    },
  },
};
</script>

<style lang="css" scoped>
@import '../assets/styles/_button.css';
@import '../assets/styles/_dropdown.css';
</style>
