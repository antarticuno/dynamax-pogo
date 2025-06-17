import {useContext, useEffect, useState} from "react";
import {fetchAttackerPokemon} from "../service/apiClient";
import {useSearchParams} from "react-router-dom";
import AttackerPokemonInterface from "../types/AttackerPokemonInterface";
import {EnergyIcon} from "hugeicons-react";
import Image from 'rc-image';
// @ts-ignore
import NotFound from "../assets/not_found.png";

import styled from "styled-components";
import AttackerExplanation from "./AttackerExplanation";
import CustomModalContext from "./CustomModalContext";
import {Tooltip} from "react-tooltip";

const styleThreshold = 900;

const AttackerSectionContainer = styled.div`
  width: 28vw;
  background-color: rgba(36, 36, 36, 0.8);
  position: relative;

  h1 {
    margin: 0;
    padding: 5px 10px;
    position: sticky;
    top: 0;
    backdrop-filter: blur(10px);

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

  #attacker-table-container {
    max-height: calc(100vh - 58px);
    overflow-y: scroll;
  }
  
  table {
    width: 100%;
    height: calc(100% - 58px);
    
    thead {
      position: sticky;
      top: 0;
      backdrop-filter: blur(20px);
    }
    
    td {
      font-size: 1em;
    }
    
    td.preview-image {
      text-align: center;
    }

    td.damage {
      font-weight: 500;
      text-shadow: -1px -1px 0 #888, 1px -1px 0 #888, -1px 1px 0 #888, 1px 1px 0 #888;
      padding: 5px 15px;
      font-size: 1.4em;
      text-align: right;
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

    #attacker-table-container {
      max-height: unset;
    }
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

const AttackerTooltip = styled(Tooltip)`
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

export default function AttackerSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [attackerPokemon, setAttackerPokemon] = useState<AttackerPokemonInterface[]>([]);
  const {setContent} = useContext(CustomModalContext);

  useEffect(() => {
    const initialize = async () => {
      const bossPokemonId = !!pokemonId ? pokemonId : undefined;
      if (!!bossPokemonId) {
        const response = await fetchAttackerPokemon(bossPokemonId);
        setAttackerPokemon(response);
      }
    };

    initialize();
  }, [searchParams]);

  if (!pokemonId) {
    return <AttackerSectionContainer>
      <hr id="attack-header" className="hidden" />
      <h1>
        <EnergyIcon height={30} width={30} />
        Strike
      </h1>
      <AttackerExplanation />
    </AttackerSectionContainer>
  }
  return <AttackerSectionContainer>
    <hr id="attack-header" className="hidden" />
    <h1>
      <EnergyIcon height={30} width={30} />
      Strike
      <span data-tooltip-id="attacker-tooltip">•••</span>
    </h1>
    <div id="attacker-table-container">
    <table>
      <thead>
        <tr>
          <th className="left-align" colSpan={2}>Pokemon</th>
          <th className="left-align">Move Name</th>
          <th className="left-align">Damage Dealt</th>
        </tr>
      </thead>
      <tbody>
        {attackerPokemon.map(((attacker, idx) => {
          return <tr key={`attacker-${idx}`}>
            <td className="preview-image">
              <Image src={attacker.pokemonImgUrl}
                     fallback={NotFound}
                     data-tooltip-id={`attacker-tooltip-${idx}`}/>
              <AttackerTooltip id={`attacker-tooltip-${idx}`}>
                {attacker.pokemonName}
                <ul>
                  <li>ATK: {attacker.pokemonAttack}</li>
                  <li>DEF: {attacker.pokemonDefense}</li>
                  <li>STA: {attacker.pokemonStamina}</li>
                </ul>
              </AttackerTooltip>
            </td>
            <td className="capitalize">{attacker.pokemonName}</td>
            <td>{attacker.maxMoveName}</td>
            <td className="damage">{attacker.damage}</td>
          </tr>;
        }))}
      </tbody>
    </table>
    </div>
    <ConfigureTooltip id="attacker-tooltip"
                      variant={'light'}
                      style={{padding: '0', zIndex: '4'}}
                      clickable
                      openOnClick>
      <div onClick={() => setContent(<AttackerExplanation />)}>About Max Attacks</div>
      {/*<div>Help <HelpCircleIcon /></div>*/}
    </ConfigureTooltip>
  </AttackerSectionContainer>;
}
