import {ReactNode, useEffect, useState} from "react";
import {fetchDefenderPokemon} from "../service/apiClient";
import {useSearchParams} from "react-router-dom";
import DefenderPokemonMapInterface from "../types/DefenderPokemonMapInterface";
import * as d3 from 'd3';
import styled from "styled-components";

const DefenderSectionContainer = styled.div`
  max-height: 100vh;
  overflow-y: scroll;
  
  table {
    border-spacing: 0;
  }
`;

const DefenderTableBlock = styled.tbody`
  tr:last-of-type td {
    border-bottom: 5px solid white;
  }
`;

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
    const resultRow: ReactNode[] = [];
    for (const defenderName in defenderMap) {
      if (defenderMap.hasOwnProperty(defenderName)) {
        const movesList = defenderMap[defenderName];
        const colorScale = d3.scaleLinear(
          [1, 60, 180],
          ['green', 'yellow', 'red']);
        resultRow.push(<DefenderTableBlock key={`defender-${defenderName}`}>
        {movesList.map((move, idx) => {
          return (<tr key={`defender-${defenderName}-${idx}`}>
            <td className="capitalize">{move.pokemonName}</td>
            <td>{move.moveName}</td>
            <td style={{background: colorScale(move.damage)}}>{move.damage}</td>
          </tr>)
        })}
        </DefenderTableBlock>);
      }
    }
    return resultRow;
  };

  return <DefenderSectionContainer>
    <table>
      <thead>
      <tr>
        <th>Pokemon</th>
        <th>Move Name</th>
        <th>Damage Received</th>
      </tr>
      </thead>
      {generateDefenderRows(defenderPokemon)}
    </table>
  </DefenderSectionContainer>;
}
