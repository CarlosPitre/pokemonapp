<template>
  <div class="main">
    <div class="container">
      <pokemon-list-component :pokemonList="myPokemonList" @showPokemon="showPokemon" />
    </div>
  </div>
  <modal v-if="showDetail">
    <pokemon-detail :pokemon="pokemon" @onClose="showDetail = false" />
  </modal>
  <div class="tabs">
    <button-tab :active="activeAll" @action="showAllPokemons">
      <font-awesome-icon icon="list" size="lg" color="white" />
      All
    </button-tab>
    <button-tab :active="activeFavorites" @action="showFavorites">
      <font-awesome-icon icon="star" size="lg" color="white" />
      Favorites
    </button-tab>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import PokemonListComponent from '@/components/PokemonList.vue';
import ButtonTab from '@/components/ButtonTab.vue';
import Modal from '@/components/Modal.vue';
import PokemonDetail from '@/components/PodemonDetail.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faList, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import buildPokemonClient, { PokemonClientInterface } from '@/clients/pokemonClient';
import axiosHttpClient from '@/api/AxiosHttpClient';
import GetPokemons, { MyPokemonList, PokemonList } from '@/types/GetPokemons';
import Pokemon from '@/types/Pokemon';

library.add(faList, faStar);

interface DataPokemonContainer {
  pokemonClient: PokemonClientInterface;
  pokemonList: Array<PokemonList>;
  myPokemonList: Array<MyPokemonList>;
  pokemon: Pokemon,
  count: string;
  next: string;
  previus: string;
  activeAll: boolean,
  activeFavorites: boolean,
  showDetail: boolean,
}

export default defineComponent({
  components: {
    PokemonListComponent,
    ButtonTab,
    FontAwesomeIcon,
    Modal,
    PokemonDetail,
  },
  name: 'PokemonContainer',
  data(): DataPokemonContainer {
    return {
      pokemonClient: buildPokemonClient(axiosHttpClient),
      pokemonList: [],
      myPokemonList: [],
      pokemon: {} as Pokemon,
      count: '',
      next: '',
      previus: '',
      activeAll: true,
      activeFavorites: false,
      showDetail: false,
    };
  },
  computed: {
    ...mapState(['myPokemons']),
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
        this.mapMyPokemonList(results, this.myPokemons);
        this.count = count;
        this.previus = previus;
        this.next = next;
        this.pokemonList = results;
      } catch (error) {
        console.log(error);
      }
    },
    showAllPokemons() {
      this.activeFavorites = false;
      this.activeAll = true;
      this.mapMyPokemonList(this.pokemonList, this.myPokemons);
    },
    showFavorites() {
      this.activeFavorites = true;
      this.activeAll = false;
      this.myPokemonList = this.myPokemons;
    },
    async showPokemon(pokemonName: string) {
      try {
        const response: Pokemon = await this.pokemonClient.getPokemonByName(pokemonName);
        this.pokemon = response;
        this.showDetail = true;
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
    height: calc(100vh - 70px);
    overflow: scroll;
  }
  .container {
    display: flex;
    flex-direction: column;
    width: 570px;
    min-width: 315px;
    height: fit-content;
    padding-bottom: 20px;
  }
  .tabs {
    position: fixed;
    left: 0%;
    right: 0%;
    bottom: 0%;
    height: 80px;
    background: #FFFFFF;
    box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
</style>
