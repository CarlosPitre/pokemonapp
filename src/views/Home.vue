<template>
  <div class="home">
    <img alt="image-logo" src="../assets/pikachu-home.svg" >
    <h1 class="title">Welcome to Pokédex</h1>
    <p class="description">
      The digital encyclopedia created by Professor Oak is an
      invaluable tool to Trainers in the Pokémon world.
    </p>
    <button-primary text="Get started" @onPress="navigateToPokemons" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
// eslint-disable-next-line import/no-cycle
import router from '@/router';

export default defineComponent({
  name: 'Home',
  components: {
    ButtonPrimary,
  },
  methods: {
    navigateToPokemons() {
      router.push('pokemons');
    },
  },
});
</script>
<style scoped lang='scss'>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
  }
  .title {
    font-style: normal;
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #353535;
  }
  .description {
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    color: #5E5E5E;
    max-width: 570px;
  }
</style>
