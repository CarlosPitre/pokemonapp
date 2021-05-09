import { MyPokemonList } from '@/types/GetPokemons';

const mockFavorities: MyPokemonList[] = [
  {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    favorite: true,
  },
  {
    name: 'charmander',
    url: 'https://pokeapi.co/api/v2/pokemon/4/',
    favorite: true,
  },
];

export default mockFavorities;
