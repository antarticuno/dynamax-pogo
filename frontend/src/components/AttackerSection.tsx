import {useEffect, useState} from "react";
import {fetchAttackerPokemon} from "../service/apiClient";
import {useSearchParams} from "react-router-dom";
import AttackerPokemonInterface from "../types/AttackerPokemonInterface";
import { EnergyIcon } from "hugeicons-react";
import Image from 'rc-image';
// @ts-ignore
import NotFound from "../assets/not_found.png";

import styled from "styled-components";
import AttackerExplanation from "./AttackerExplanation";

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
    
    td.preview-image {
      text-align: center;
    }

    td.damage {
      font-weight: 500;
      text-shadow: -1px -1px 0 #888, 1px -1px 0 #888, -1px 1px 0 #888, 1px 1px 0 #888;
      padding: 5px;
    }
    
    img {
      height: 4em;
    }
  }
`;

export default function AttackerSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [attackerPokemon, setAttackerPokemon] = useState<AttackerPokemonInterface[]>([]);
  useEffect(() => {
    const initialize = async () => {
      const bossPokemonId = !!pokemonId ? Number(pokemonId) : undefined;
      if (!!bossPokemonId) {
        const response = await fetchAttackerPokemon(bossPokemonId);
        setAttackerPokemon(response);
      }
    };

    initialize();
  }, [searchParams]);

  if (!pokemonId) {
    return <AttackerSectionContainer>
      <h1>
        <EnergyIcon height={30} width={30} />
        Strike
      </h1>
      <AttackerExplanation />
    </AttackerSectionContainer>
  }
  return <AttackerSectionContainer>
    <h1>
      <EnergyIcon height={30} width={30} />
      Strike
    </h1>
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Pokemon</th>
          <th>Move Name</th>
          <th>Damage Dealt</th>
        </tr>
      </thead>
      <tbody>
        {attackerPokemon.map(((attacker, idx) => {
          return <tr key={`attacker-${idx}`}>
            <td className="preview-image">
              <Image src={attacker.pokemonImgUrl}
                       fallback={NotFound} />
            </td>
            <td className="capitalize">{attacker.pokemonName}</td>
            <td>{attacker.maxMoveName}</td>
            <td className="damage">{attacker.damage}</td>
          </tr>;
        }))}
      </tbody>
    </table>
  </AttackerSectionContainer>;
}
