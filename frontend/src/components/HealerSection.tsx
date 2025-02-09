import {useEffect, useState} from "react";
import HealerPokemonInterface from "../types/HealerPokemonInterface";
import {fetchHealerPokemon} from "../service/apiClient";
import {useSearchParams} from "react-router-dom";

export default function HealerSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [bossPokemonId, _setBossPokemonId] = useState<number | undefined>(!!pokemonId ? Number(pokemonId) : undefined);
  const [healerPokemon, setHealerPokemon] = useState<HealerPokemonInterface[]>([]);
  useEffect(() => {
    const initialize = async () => {
      const response = await fetchHealerPokemon();
      setHealerPokemon(response);
    };

    initialize();
  }, [bossPokemonId]);

  return <>
    <table>
      <tr>
        <th>Pokemon</th>
        <th>Healing Amount</th>
      </tr>
      {healerPokemon.map((healer => {
        return <tr>
          <td>{healer.pokemonName}</td>
          <td>{healer.maxHealingAmount}</td>
        </tr>;
      }))}
    </table>
  </>;
}
