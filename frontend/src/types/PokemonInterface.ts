export default interface PokemonInterface {
  pokemonId: string,
  pokemonName: string,
  primaryType: string,
  secondaryType: string | undefined,
  attack: number,
  defense: number,
  stamina: number,
  imgUrl: string | undefined

}
