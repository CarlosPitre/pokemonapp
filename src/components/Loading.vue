<template>
  <div class="container">
    <img alt="image-logo" src="@/assets/Loader.svg" class="bounce-top" >
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Loading',
});
</script>

<style scoped lang="scss">
  .container {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bounce-top{
    animation:bounce-top 3s ease-in infinite both;
    width: 106px;
    height: 106px;
  }

  @keyframes bounce-top {
    0% {
      transform: translateY(-45px);
      animation-timing-function: ease-in;
      opacity: 1;
    }
    24% {
      opacity: 1;
    }
    40% {
      transform: translateY(-24px);
      animation-timing-function: ease-in;
    }
    65% {
      transform: translateY(-12px);
      animation-timing-function: ease-in;
    }
    82% {
      transform: translateY(-6px);
      animation-timing-function: ease-in;
    }
    93% {
      transform: translateY(-4px);
      animation-timing-function: ease-in;
    }
    25%,
    55%,
    75%,
    87% {
      transform: translateY(0px);
      animation-timing-function: ease-out;
    }
    100% {
      transform: translateY(0px);
      animation-timing-function: ease-out;
      opacity: 1;
    }
  }
</style>
