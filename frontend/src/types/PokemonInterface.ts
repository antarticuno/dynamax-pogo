export default interface PokemonInterface {
  pokemonId: string,
  pokemonName: string,
  pokemonNumber: number,
  primaryType: string,
  secondaryType: string | undefined,
  attack: number,
  defense: number,
  stamina: number,
  maxCp: number | undefined,
  maxCpBoosted: number | undefined,
  imgUrl: string | undefined

}
