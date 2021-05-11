<template lang="">
  <button class="button-tab" :class="activeButton" @click="onPress">
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonTab',
  props: {
    text: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onPress() {
      this.$emit('action');
    },
  },
  computed: {
    activeButton(): string {
      return this.active ? 'button-active' : '';
    },
  },
});
</script>
<style lang="scss">
  .button-tab {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 11px 20px;
    height: 44px;
    left: 511px;
    top: 583px;
    color: white;
    border-radius: 60px;
    border: none;
    font-size: 18px;
    width: 255px;
    background-color: #BFBFBF;
    gap: 10px;
  }
  @media only screen and (max-width: 600px) {
    .button-tab {
      width: 150px;
    }
  }
  .button-active {
    background: #F22539;
  }
</style>
