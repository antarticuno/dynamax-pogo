import {useContext, useEffect, useState} from "react";
import {fetchDefenderPokemon} from "../service/apiClient";
import {useSearchParams} from "react-router-dom";
import * as d3 from 'd3';
import styled from "styled-components";
import {HelpCircleIcon, Shield01Icon} from "hugeicons-react";
import DefenderPokemonInterface from "../types/DefenderPokemonInterface";
import Image from "rc-image";
// @ts-ignore
import NotFound from "../assets/not_found.png";
import DefenderExplanation from "./DefenderExplanation";
import { Tooltip } from 'react-tooltip';
import CustomModalContext from "./CustomModalContext";

const styleThreshold = 900;

const DefenderSectionContainer = styled.div`
  width: 29vw;
  max-height: 100vh;
  overflow-y: scroll;
  background-color: rgba(36, 36, 36, 0.8);

  h1 {
    margin: 0;
    padding: 5px 10px;
    position: sticky;
    top: 0px;
    
    & > span {
      position: absolute;
      right: 10px;
      font-size: 0.8em;
      cursor: pointer;
    }

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

const DefenderTableBlock = styled.tbody`
  tr:last-of-type td {
    border-bottom: 3px solid white;
  }
`;

const ConfigureTooltip = styled(Tooltip)`
  div:not(.react-tooltip-arrow) {
    cursor: pointer;
    padding: 8px 15px;
    
    &:hover {
      background-color: rgba(36, 36, 36, 0.2);
    }
  }
  
  svg {
    vertical-align: middle;
  }
`;

export default function DefenderSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [defenderPokemon, setDefenderPokemon] = useState<DefenderPokemonInterface[]>([]);
  const [isScaleShields, setIsScaleShields] = useState<boolean>(true);
  const {setContent} = useContext(CustomModalContext);

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
      <span data-tooltip-id="defender-tooltip">•••</span>
    </h1>
    <table>
      <thead>
      <tr>
        <th className="left-align" colSpan={2}>Pokemon</th>
        <th className="left-align">Move Name</th>
        <th className="left-align">Damage Received</th>
      </tr>
      </thead>
      <>
        {defenderPokemon.map(dpkmn => {
          return <DefenderTableBlock key={`defender-${dpkmn.pokemonName}`}>
            {dpkmn.damageCalculations.map((move, idx) => {
              const colorScale = d3.scaleLinear(
                isScaleShields ? [1, 60, 180] : [1, dpkmn.pokemonStamina / 2, dpkmn.pokemonStamina],
                ['green', 'yellow', 'red']);
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
                <td className="damage" style={{background: colorScale(move.damage)}}>{move.damage}</td>
              </tr>)
            })}
          </DefenderTableBlock>
        })}
      </>
    </table>
    <ConfigureTooltip id="defender-tooltip"
                      variant={'light'}
                      style={{padding: '0'}}
                      clickable
                      openOnClick>
      <div onClick={() => setContent(<DefenderExplanation />)}>About Max Guard</div>
      <div onClick={() => setIsScaleShields(!isScaleShields)}>Color Scale: {isScaleShields ? 'Shield HP (180HP)' : 'Stamina HP'}</div>
      <div>Help <HelpCircleIcon /></div>
    </ConfigureTooltip>
  </DefenderSectionContainer>;
}
