interface TypePokemon {
  type: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  id: string,
  name: string;
  weight: string;
  height: string;
  types: Array<TypePokemon>;
}

export default Pokemon;
