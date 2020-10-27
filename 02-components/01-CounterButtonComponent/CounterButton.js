export const CounterButton = {
  template: '<button type="button" @click="increment">{{ counter }}</button>',
  props: {
    count: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    counter: {
      get() {
        return this.count || this.value;
      },
      set(val) {
        this.$emit('increment', val);
        this.$emit('input', val);
      }
    }
  },
  created() {
    this.setMissingValue();
  },
  methods: {
    setMissingValue() {
      if (!this.count && !this.value) this.counter = 0;
    },
    increment() {
      this.counter += 1;
    }
  }
};
