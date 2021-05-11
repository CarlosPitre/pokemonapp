<template>
  <div class="main">
    <div>
      <div class="container" >
        <div class="container-input">
          <font-awesome-icon icon="search" size="lg" color="#BFBFBF" />
          <input type="text" placeholder="Search" v-model="txtSearch">
        </div>
        <pokemon-list-component
          v-if="!isLoading"
          :pokemonList="searchPokemons"
          @showPokemon="showPokemon"
        />
      </div>
      <loading v-if="isLoading" />
    </div>
  </div>
  <modal v-if="showDetail">
    <pokemon-detail
      :pokemon="pokemon"
      @onClose="showDetail = false"
    />
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
import Loading from '@/components/Loading.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faList, faStar, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import buildPokemonClient, { PokemonClientInterface } from '@/clients/pokemonClient';
import axiosHttpClient from '@/api/AxiosHttpClient';
import GetPokemons, { MyPokemonList, PokemonList } from '@/types/GetPokemons';
import Pokemon from '@/types/Pokemon';

library.add(faList, faStar, faSearch);

interface DataPokemonContainer {
  pokemonClient: PokemonClientInterface;
  pokemonList: Array<PokemonList>;
  pokemon: Pokemon,
  count: string;
  next: string;
  previus: string;
  activeAll: boolean,
  activeFavorites: boolean,
  showDetail: boolean,
  isLoading: boolean,
  txtSearch: string,
}

export default defineComponent({
  components: {
    PokemonListComponent,
    ButtonTab,
    FontAwesomeIcon,
    Modal,
    PokemonDetail,
    Loading,
  },
  name: 'PokemonContainer',
  data(): DataPokemonContainer {
    return {
      pokemonClient: buildPokemonClient(axiosHttpClient),
      pokemonList: [],
      pokemon: {} as Pokemon,
      count: '',
      next: '',
      previus: '',
      activeAll: true,
      activeFavorites: false,
      showDetail: false,
      isLoading: true,
      txtSearch: '',
    };
  },
  computed: {
    ...mapState(['myPokemons']),
    listPokemons(): Array<MyPokemonList> {
      return this.activeAll ? this.mapMyPokemonList() : this.myPokemons;
    },
    searchPokemons(): Array<MyPokemonList> {
      const search = this.txtSearch.toLowerCase().trim();
      if (!search) return this.listPokemons;
      return this.listPokemons.filter((pokemon) => pokemon.name.toLowerCase().indexOf(search) > -1);
    },
  },
  methods: {
    mapMyPokemonList(): Array<MyPokemonList> {
      return this.pokemonList.map((pokemon) => ({
        ...pokemon,
        favorite: this.myPokemons.map((myPokemon: MyPokemonList) => myPokemon.name)
          .includes(pokemon.name),
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
        this.count = count;
        this.previus = previus;
        this.next = next;
        this.pokemonList = results;
        setTimeout(() => {
          this.isLoading = false;
        }, 4000);
      } catch (error) {
        this.isLoading = false;
        console.log(error);
      }
    },
    showAllPokemons() {
      this.activeFavorites = false;
      this.activeAll = true;
    },
    showFavorites() {
      this.activeFavorites = true;
      this.activeAll = false;
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

<style scope lang="scss">
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
  .container-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 15px;
    gap: 15px;
    width: 550px;
    min-width: 315px;
    background: #FFFFFF;
    border-radius: 5px;
    height: 50px;
    margin-bottom: 40px;
    margin-top: 35px;

    input {
      border: none;
      flex: 1;
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
    }
    input:focus{
        outline: none;
    }
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
