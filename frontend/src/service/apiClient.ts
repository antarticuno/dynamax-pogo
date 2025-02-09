import HealerPokemonInterface from "../types/HealerPokemonInterface";
import AttackerPokemonInterface from "../types/AttackerPokemonInterface";
import DefenderPokemonMapInterface from "../types/DefenderPokemonMapInterface";

const backendUrl = 'http://localhost:8080';

/**
 * Fetch the list of healer pokemon
 */
const fetchHealerPokemon = async () => {
  let queryUrl = `${backendUrl}/api/v1/spirit`;
  const response = await fetch(queryUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: HealerPokemonInterface[] = await response.json();
  return data;
}


const fetchAttackerPokemon = async (pokemonId: number) => {
  let queryUrl = `${backendUrl}/api/v1/strike?bossPokemonId=${pokemonId}`;
  const response = await fetch(queryUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: AttackerPokemonInterface[] = await response.json();
  return data;
}

const fetchDefenderPokemon = async (pokemonId: number) => {
  let queryUrl = `${backendUrl}/api/v1/guard?bossPokemonId=${pokemonId}`;
  const response = await fetch(queryUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: DefenderPokemonMapInterface = await response.json();
  return data;
};

export {
  fetchHealerPokemon,
  fetchAttackerPokemon,
  fetchDefenderPokemon
};
