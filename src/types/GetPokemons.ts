export type PokemonList = {
  name: string;
  url: string;
}

export type MyPokemonList = PokemonList & {
  favorite: boolean,
}

type GetPokemons = {
  count: string;
  next: string;
  previus: string;
  results: Array<PokemonList>;
}

export default GetPokemons;
