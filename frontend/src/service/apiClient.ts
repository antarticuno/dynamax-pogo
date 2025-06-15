import HealerPokemonInterface from "../types/HealerPokemonInterface";
import AttackerPokemonInterface from "../types/AttackerPokemonInterface";
import PokemonInterface from "../types/PokemonInterface";
import DefenderPokemonInterface from "../types/DefenderPokemonInterface";

const backendUrl = import.meta.env.VITE_API_BASE_URL || 'https://dynamax-pogo-845399893871.us-central1.run.app';

const fetchPokemon = async (pokemonId: string) => {
  let queryUrl = `${backendUrl}/api/v1/manage?pokemonId=${pokemonId}`;
  const response = await fetch(queryUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: PokemonInterface = await response.json();
  console.log(data);
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


const fetchAttackerPokemon = async (pokemonId: string) => {
  let queryUrl = `${backendUrl}/api/v1/strike?bossPokemonId=${pokemonId}`;
  const response = await fetch(queryUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: AttackerPokemonInterface[] = await response.json();
  return data;
}

const fetchDefenderPokemon = async (pokemonId: string) => {
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
