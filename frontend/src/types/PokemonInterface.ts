export default interface PokemonInterface {
  pokemonId: string,
  pokemonName: string,
  pokemonNumber: number,
  primaryType: string,
  secondaryType: string | undefined,
  attack: number,
  defense: number,
  stamina: number,
  imgUrl: string | undefined

}
