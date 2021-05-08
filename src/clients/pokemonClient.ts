import HttpProvider from '@/api/HttpProvider';
import GetPokemons from '@/types/GetPokemons';
import Pokemon from '@/types/Pokemon';

export interface PokemonClient {
  getPokemons(url?: string): Promise<GetPokemons>;
  getPokemonByName(pokemonName: string): Promise<Pokemon>;
}

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

function buildPokemonClient(httpProvider: HttpProvider): PokemonClient {
  return {
    getPokemons(url?: string) {
      return httpProvider.get<GetPokemons>(url || BASE_URL);
    },
    getPokemonByName(pokemonName: string) {
      return httpProvider.get<Pokemon>(`${BASE_URL}/${pokemonName}`);
    },
  };
}

export default buildPokemonClient;
