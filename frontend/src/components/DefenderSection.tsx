import {ReactNode, useEffect, useState} from "react";
import {fetchDefenderPokemon} from "../service/apiClient";
import {useSearchParams} from "react-router-dom";
import DefenderPokemonMapInterface from "../types/DefenderPokemonMapInterface";

export default function DefenderSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [bossPokemonId, _setBossPokemonId] = useState<number | undefined>(!!pokemonId ? Number(pokemonId) : undefined);
  const [defenderPokemon, setDefenderPokemon] = useState<DefenderPokemonMapInterface>({});
  useEffect(() => {
    const initialize = async () => {
      if (!!bossPokemonId) {
        const response = await fetchDefenderPokemon(bossPokemonId);
        setDefenderPokemon(response);
      }
    };

    initialize();
  }, [bossPokemonId]);

  const generateDefenderRows = (defenderMap: DefenderPokemonMapInterface) => {
    const resultRow : ReactNode[] = [];
    for (const defenderName in defenderMap) {
      if (defenderMap.hasOwnProperty(defenderName)) {
        const movesList = defenderMap[defenderName];
        movesList.forEach(move =>
          resultRow.push(<tr>
            <td>{move.pokemonName}</td>
            <td>{move.moveName}</td>
            <td>{move.damage}</td>
          </tr>)
          );
      }
    }
    return resultRow;
  };

  return <>
    <table>
      <tr>
        <th>Pokemon</th>
        <th>Move Name</th>
        <th>Damage Amount</th>
      </tr>
      {generateDefenderRows(defenderPokemon)}
    </table>
  </>;
}
