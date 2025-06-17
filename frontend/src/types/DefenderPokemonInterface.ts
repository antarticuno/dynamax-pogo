export default interface DefenderPokemonInterface {
  pokemonId: string,
  pokemonName: string,
  pokemonImgUrl: string,
  pokemonAttack: number,
  pokemonDefense: number,
  pokemonStamina: number,
  averageDamageReceived?: number,
  damageCalculations: DamageCalculationInterface[]
}

export interface DamageCalculationInterface {
  moveName: string,
  damage: number
}
