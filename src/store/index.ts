import mockFavorities from '@/clients/Mock';
import { MyPokemonList } from '@/types/GetPokemons';
import { createStore } from 'vuex';

export default createStore({
  state: {
    myPokemons: mockFavorities,
  },
  mutations: {
    addFavorite(state, newPokemon: MyPokemonList) {
      state.myPokemons = [...state.myPokemons, { ...newPokemon, favorite: true }];
    },
    removeFavorite(state, pokemonName: string) {
      state.myPokemons = state.myPokemons.filter((pokemon) => pokemon.name !== pokemonName);
    },
  },
  actions: {
    addFavoriteAction({ commit }, newPokemon: MyPokemonList) {
      commit('addFavorite', newPokemon);
    },
    removeFavoriteAction({ commit }, pokemonName: string) {
      commit('removeFavorite', pokemonName);
    },
  },
  modules: {
  },
});
