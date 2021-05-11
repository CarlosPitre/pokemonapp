<template>
  <div v-for="(pokemon, index) in pokemonList" :key="index" @click="showPokemon(pokemon.name)">
   <pokemon-item :pokemon="pokemon" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MyPokemonList } from '@/types/GetPokemons';
import PokemonItem from '@/components/PokemonItem.vue';

export default defineComponent({
  name: 'PokemonListComponent',
  emits: ['showPokemon'],
  components: {
    PokemonItem,
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
  },
});
</script>

<style></style>
