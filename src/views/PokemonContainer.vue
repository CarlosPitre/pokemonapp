<template>
  <div class="main">
    <div class="container">
      <pokemon-list-component :pokemonList="myPokemonList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PokemonListComponent from '@/components/PokemonList.vue';
import buildPokemonClient, { PokemonClientInterface } from '@/clients/pokemonClient';
import axiosHttpClient from '@/api/AxiosHttpClient';
import GetPokemons, { MyPokemonList, PokemonList } from '@/types/GetPokemons';
import mockFavorities from '@/clients/Mock';

interface DataPokemonContainer {
  pokemonClient: PokemonClientInterface;
  pokemonList: Array<PokemonList>;
  myPokemonList: Array<MyPokemonList>;
  count: string;
  next: string;
  previus: string;
}

export default defineComponent({
  components: { PokemonListComponent },
  name: 'PokemonContainer',
  data(): DataPokemonContainer {
    return {
      pokemonClient: buildPokemonClient(axiosHttpClient),
      pokemonList: [],
      myPokemonList: [],
      count: '',
      next: '',
      previus: '',
    };
  },
  methods: {
    mapMyPokemonList(pokemonList: Array<PokemonList>, myFavorites: Array<MyPokemonList>) {
      this.myPokemonList = pokemonList.map((pokemon) => ({
        ...pokemon,
        favorite: myFavorites.map((myPokemon) => myPokemon.name).includes(pokemon.name),
      }));
    },
    async loadPokemon(url?: string) {
      try {
        const data: GetPokemons = await this.pokemonClient.getPokemons(url);
        const {
          results,
          count,
          next,
          previus,
        } = data;
        this.mapMyPokemonList(results, mockFavorities);
        this.count = count;
        this.previus = previus;
        this.next = next;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.loadPokemon();
  },
});
</script>

<style scope>
  .main {
    display: flex;
    justify-content: center;
    background-color: #E5E5E5;
  }
  .container {
    display: flex;
    flex-direction: column;
    width: 570px;
    min-width: 315px;
  }
</style>
