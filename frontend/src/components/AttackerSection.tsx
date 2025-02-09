import {useEffect, useState} from "react";
import {fetchAttackerPokemon} from "../service/apiClient";
import {useSearchParams} from "react-router-dom";
import AttackerPokemonInterface from "../types/AttackerPokemonInterface";

export default function AttackerSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [bossPokemonId, _setBossPokemonId] = useState<number | undefined>(!!pokemonId ? Number(pokemonId) : undefined);
  const [attackerPokemon, setAttackerPokemon] = useState<AttackerPokemonInterface[]>([]);
  useEffect(() => {
    const initialize = async () => {
      if (!!bossPokemonId) {
        const response = await fetchAttackerPokemon(bossPokemonId);
        setAttackerPokemon(response);
      }
    };

    initialize();
  }, [bossPokemonId]);

  return <>
    <table>
      <thead>
        <tr>
          <th>Pokemon</th>
          <th>Move Name</th>
          <th>Damage Amount</th>
        </tr>
      </thead>
      <tbody>
        {attackerPokemon.map(((attacker, idx) => {
          return <tr key={`attacker-${idx}`}>
            <td>{attacker.pokemonName}</td>
            <td>{attacker.maxMoveName}</td>
            <td>{attacker.damage}</td>
          </tr>;
        }))}
      </tbody>
    </table>
  </>;
}
