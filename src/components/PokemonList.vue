<template>
  <div v-for="(pokemon, index) in pokemonList" :key="index">
   <pokemon-item :name="pokemon.name" :favorite="pokemon.favorite" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MyPokemonList } from '@/types/GetPokemons';
import PokemonItem from '@/components/PokemonItem.vue';

export default defineComponent({
  name: 'PokemonListComponent',
  components: {
    PokemonItem,
  },
  props: {
    pokemonList: {
      type: Array as PropType<Array<MyPokemonList>>,
      default: () => [],
    },
  },
});
</script>

<style></style>
