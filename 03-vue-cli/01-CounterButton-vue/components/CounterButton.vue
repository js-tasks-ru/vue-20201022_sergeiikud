<template>
  <button type="button" @click="increment">{{ count }}</button>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0
    },
  },
  model: {
    prop: 'count',
    event: 'increment'
  },
  methods: {
    increment() {
      this.$emit('increment', this.count + 1);
    }
  }
};
</script>

<style></style>
