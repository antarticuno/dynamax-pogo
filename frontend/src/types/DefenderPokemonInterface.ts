export default interface DefenderPokemonInterface {
  pokemonId: string,
  pokemonName: string,
  pokemonImgUrl: string,
  pokemonStamina: number,
  averageDamageReceived?: number,
  damageCalculations: DamageCalculationInterface[]
}

export interface DamageCalculationInterface {
  moveName: string,
  damage: number
}
