import HealerPokemonInterface from "../types/HealerPokemonInterface";
import AttackerPokemonInterface from "../types/AttackerPokemonInterface";
import PokemonInterface from "../types/PokemonInterface";
import DefenderPokemonInterface from "../types/DefenderPokemonInterface";

const backendUrl = 'http://localhost:8080';

const fetchPokemon = async (pokemonId: number) => {
  let queryUrl = `${backendUrl}/api/v1/manage?pokemonId=${pokemonId}`;
  const response = await fetch(queryUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: PokemonInterface = await response.json();
  return data;
}

const fetchAllPokemon = async () => {
  let queryUrl = `${backendUrl}/api/v1/manage/all`;
  const response = await fetch(queryUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: PokemonInterface[] = await response.json();
  return data;
};

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
  const data: DefenderPokemonInterface[] = await response.json();
  return data;
};

export {
  fetchPokemon,
  fetchAllPokemon,
  fetchHealerPokemon,
  fetchAttackerPokemon,
  fetchDefenderPokemon
};
