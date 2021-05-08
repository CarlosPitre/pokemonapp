interface PokemonList {
  name: string;
  url: string;
}

interface GetPokemons {
  count: string;
  next: string;
  previus: string;
  results: Array<PokemonList>;
}

export default GetPokemons;
