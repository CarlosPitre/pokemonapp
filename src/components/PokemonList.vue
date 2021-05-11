<template>
  <div v-if="(pokemonList.length > 0)">
    <div v-for="(pokemon, index) in pokemonList" :key="index" @click="showPokemon(pokemon.name)">
      <pokemon-item :pokemon="pokemon" />
    </div>
  </div>
  <div v-if="(pokemonList.length === 0)" class="empty-data">
    <h2>Uh-oh!</h2>
    <p>You look lost on your journey!</p>
    <button-primary text="Go back home" @onPress="navigateToHome" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MyPokemonList } from '@/types/GetPokemons';
import PokemonItem from '@/components/PokemonItem.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import router from '@/router';

export default defineComponent({
  name: 'PokemonListComponent',
  emits: ['showPokemon'],
  components: {
    PokemonItem,
    ButtonPrimary,
  },
  props: {
    pokemonList: {
      type: Array as PropType<Array<MyPokemonList>>,
      default: () => [],
    },
  },
  methods: {
    showPokemon(pokemon: string) {
      this.$emit('showPokemon', pokemon);
    },
    navigateToHome() {
      router.push('/');
    },
  },
});
</script>

<style scoped lang="scss">
  .empty-data {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-size: 36px;
    }
    p {
      font-size: 20px;
      color: #5E5E5E;
    }
  }
</style>
