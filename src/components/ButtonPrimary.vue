<template>
  <button class="button-primary">{{ text }}</button>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonPrimary',
  props: {
    text: String,
  },
});
</script>

<style scoped lang="scss">
  .button-primary {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 11px 20px;
    height: 44px;
    left: 511px;
    top: 583px;
    color: white;
    background: #F22539;
    border-radius: 60px;
    border: none;
    font-size: 18px;
  }
</style>
