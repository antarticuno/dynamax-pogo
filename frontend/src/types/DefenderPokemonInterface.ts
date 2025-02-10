export default interface DefenderPokemonInterface {
  pokemonId: number,
  pokemonName: string,
  pokemonStamina: number,
  averageDamageReceived?: number,
  damageCalculations: DamageCalculationInterface[]
}

export interface DamageCalculationInterface {
  moveName: string,
  damage: number
}
