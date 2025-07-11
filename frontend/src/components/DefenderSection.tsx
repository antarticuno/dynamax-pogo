import {useContext, useEffect, useState} from "react";
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
import { Tooltip } from 'react-tooltip';
import CustomModalContext from "./CustomModalContext";

const styleThreshold = 1024;

const DefenderSectionContainer = styled.div`
  width: 29vw;
  background-color: rgba(36, 36, 36, 0.8);

  h1 {
    margin: 0;
    padding: 5px 10px;
    position: sticky;
    top: 0;
    backdrop-filter: blur(20px);

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
  
  #defender-table-container {
    max-height: calc(100vh - 58px);
    overflow-y: scroll;
  }
  
  table {
    border-spacing: 0;
    width: 100%;
    height: calc(100% - 58px);
    
    thead {
      position: sticky;
      top: 0;
      backdrop-filter: blur(20px);
    }

    td.preview-image {
      text-align: center;
      border-bottom: 3px solid white;
    }
    
    td.damage {
      width: 15%;
      font-weight: 500;
      text-shadow: -1px -1px 0px #555, 1px -1px 0px #555, -1px 1px 0px #555, 1px 1px 0px #555;
      padding: 2px 8px;
      font-size: 1.2em;
      text-align: right;
    }
    
    td.move-name {
      width: 100%;
    }

    img {
      height: 4em;
    }
  }

  @media(max-width: ${styleThreshold}px) {
    width: 100%;

    h1 {
      position: sticky;
      top: calc(15vw + 20px);
      z-index: 2;
    }

    #defender-table-container {
      max-height: unset;
    }
    
    table {
      table-layout: fixed;
      width: 100%;
      
      td.preview-image.capitalize {
        text-align: left;
      }
      
      td.damage {
        width: unset;
      }
    }
  }
  
  @media print {
    font-size: 0.8em;
    color: #242424;
    
    img {
      display: none;
    }
    
    table {
      width: 100%;
      
      td.capitalize {
        font-weight: 600;
        text-align: left;
      }

      td.damage {
        text-shadow: unset;
        font-weight: 800;
      }
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

const DefenderTooltip = styled(Tooltip)`
  text-transform: capitalize;
  
  div:not(.react-tooltip-arrow) {
    cursor: pointer;
    padding: 8px 15px;
  }
  
  ul {
    margin: 0;
    padding: 0;
    
    li {
      text-transform: uppercase;
      list-style-type: none;
      margin: 0;
    }
  }
`;

export default function DefenderSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [defenderPokemon, setDefenderPokemon] = useState<DefenderPokemonInterface[]>([]);
  const [isScaleShields, setIsScaleShields] = useState<boolean>(true);
  const {setContent} = useContext(CustomModalContext);

  useEffect(() => {
    const bossPokemonId = !!pokemonId ? pokemonId : undefined;
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
      <hr id="defend-header" className="hidden" />
      <h1>
        <Shield01Icon />
        Guard
      </h1>
      <DefenderExplanation />
    </DefenderSectionContainer>;
  }
  return <DefenderSectionContainer>
    <hr id="defend-header" className="hidden" />
    <h1>
      <Shield01Icon />
      Guard
      <span data-tooltip-id="defender-tooltip">•••</span>
    </h1>
    <div id="defender-table-container">
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
                      <td className="preview-image" rowSpan={dpkmn.damageCalculations.length}>
                        <Image src={dpkmn.pokemonImgUrl}
                               fallback={NotFound}
                               data-tooltip-id={`defender-tooltip-${dpkmn.pokemonId}`}
                               preview={false}
                        />
                        <DefenderTooltip id={`defender-tooltip-${dpkmn.pokemonId}`}>
                          {dpkmn.pokemonName}
                          <ul>
                            <li>ATK: {dpkmn.pokemonAttack}</li>
                            <li>DEF: {dpkmn.pokemonDefense}</li>
                            <li>STA: {dpkmn.pokemonStamina}</li>
                          </ul>
                        </DefenderTooltip>
                      </td>
                      <td className="capitalize preview-image" rowSpan={dpkmn.damageCalculations.length}>{dpkmn.pokemonName}</td>
                    </>
                  }
                  <td className="move-name">{move.moveName}</td>
                  <td className="damage" style={{background: colorScale(move.damage)}}>{move.damage}</td>
                </tr>)
              })}
            </DefenderTableBlock>
          })}
        </>
      </table>
    </div>
    <ConfigureTooltip id="defender-tooltip"
                      variant={'light'}
                      style={{padding: '0', zIndex: '4'}}
                      clickable
                      openOnClick>
      <div onClick={() => setContent(<DefenderExplanation />)}>About Max Guard</div>
      <div onClick={() => setIsScaleShields(!isScaleShields)}>Color Scale: {isScaleShields ? 'Shield HP (180HP)' : 'Stamina HP'}</div>
      {/*<div>Help <HelpCircleIcon /></div>*/}
    </ConfigureTooltip>
  </DefenderSectionContainer>;
}
