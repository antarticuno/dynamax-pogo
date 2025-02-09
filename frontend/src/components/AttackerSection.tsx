import {useEffect, useState} from "react";
import {fetchAttackerPokemon} from "../service/apiClient";
import {useSearchParams} from "react-router-dom";
import AttackerPokemonInterface from "../types/AttackerPokemonInterface";
import { EnergyIcon } from "hugeicons-react";

import styled from "styled-components";

const styleThreshold = 700;

const AttackerSectionContainer = styled.div`
  width: 30%;
  
  h1 {
    margin: 0;
    padding: 5px 10px;
    background-color: #242424;
    
    svg {
      vertical-align: middle;
      margin-right: 5px;
    }
  }

  @media(max-width: ${styleThreshold}px) {
    width: 100%;

    h1 {
      position: sticky;
      top: 0px;
    }
  }
  
  table {
    width: 100%;
    height: 100%;
  }
`;

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

  return <AttackerSectionContainer>
    <h1>
      <EnergyIcon height={30} width={30} />
      Strike
    </h1>
    <table>
      <thead>
        <tr>
          <th>Pokemon</th>
          <th>Move Name</th>
          <th>Damage Dealt</th>
        </tr>
      </thead>
      <tbody>
        {attackerPokemon.map(((attacker, idx) => {
          return <tr key={`attacker-${idx}`}>
            <td className="capitalize">{attacker.pokemonName}</td>
            <td>{attacker.maxMoveName}</td>
            <td>{attacker.damage}</td>
          </tr>;
        }))}
      </tbody>
    </table>
  </AttackerSectionContainer>;
}
