import {useEffect, useState} from "react";
import {fetchDefenderPokemon} from "../service/apiClient";
import {useSearchParams} from "react-router-dom";
import * as d3 from 'd3';
import styled from "styled-components";
import {Shield01Icon} from "hugeicons-react";
import DefenderPokemonInterface from "../types/DefenderPokemonInterface";
import Image from "rc-image";
// @ts-ignore
import NotFound from "../assets/not_found.png";
import DefenderExplanation from "./DefenderExplanation";

const styleThreshold = 700;

const DefenderSectionContainer = styled.div`
  width: 30%;
  max-height: 100vh;
  overflow-y: scroll;

  h1 {
    margin: 0;
    padding: 5px 10px;
    background-color: #242424;
    position: sticky;
    top: 0px;

    svg {
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  
  @media(max-width: ${styleThreshold}px) {
    width: 100%;
  }
  
  table {
    border-spacing: 0;
    width: 100%;

    td.preview-image {
      text-align: center;
      border-bottom: 3px solid white;
    }

    img {
      height: 4em;
    }
  }
`;

const DefenderTableBlock = styled.tbody`
  tr:last-of-type td {
    border-bottom: 3px solid white;
  }
`;

export default function DefenderSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [defenderPokemon, setDefenderPokemon] = useState<DefenderPokemonInterface[]>([]);
  useEffect(() => {
    const bossPokemonId = !!pokemonId ? Number(pokemonId) : undefined;
    const initialize = async () => {
      if (!!bossPokemonId) {
        const response = await fetchDefenderPokemon(bossPokemonId);
        setDefenderPokemon(response);
      }
    };

    initialize();
  }, [searchParams]);

  const colorScale = d3.scaleLinear(
    [1, 60, 180],
    ['green', 'yellow', 'red']);

  if (!pokemonId) {
    return <DefenderSectionContainer>
      <h1>
        <Shield01Icon />
        Guard
      </h1>
      <DefenderExplanation />
    </DefenderSectionContainer>;
  }
  return <DefenderSectionContainer>
    <h1>
      <Shield01Icon />
      Guard
    </h1>
    <table>
      <thead>
      <tr>
        <th colSpan={2}>Pokemon</th>
        <th>Move Name</th>
        <th>Damage Received</th>
      </tr>
      </thead>
      <>
        {defenderPokemon.map(dpkmn => {
          return <DefenderTableBlock key={`defender-${dpkmn.pokemonName}`}>
            {dpkmn.damageCalculations.map((move, idx) => {
              return (<tr key={`defender-${dpkmn.pokemonName}-${idx}`}>
                {idx === 0 &&
                  <>
                    <td className="preview-image" rowSpan={defenderPokemon.length}>
                      <Image src={dpkmn.pokemonImgUrl}
                             fallback={NotFound} />
                    </td>
                    <td className="capitalize preview-image" rowSpan={defenderPokemon.length}>{dpkmn.pokemonName}</td>
                  </>
                }
                <td>{move.moveName}</td>
                <td style={{background: colorScale(move.damage)}}>{move.damage}</td>
              </tr>)
            })}
          </DefenderTableBlock>
        })}
      </>
    </table>
  </DefenderSectionContainer>;
}
