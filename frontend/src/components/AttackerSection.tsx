import {useContext, useEffect, useState} from "react";
import {fetchAttackerPokemon} from "../service/apiClient";
import {useSearchParams} from "react-router-dom";
import AttackerPokemonInterface from "../types/AttackerPokemonInterface";
import {EnergyIcon, HelpCircleIcon} from "hugeicons-react";
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

  @media(max-width: ${styleThreshold}px) {
    width: 100%;

    h1 {
      position: sticky;
      top: 0px;
    }
  }
  
  table {
    width: 100%;
    height: calc(100% - 58px);
    
    td {
      font-size: 0.9em;
    }
    
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

export default function AttackerSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [attackerPokemon, setAttackerPokemon] = useState<AttackerPokemonInterface[]>([]);
  const {setContent} = useContext(CustomModalContext);

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
      <span data-tooltip-id="attacker-tooltip">•••</span>
    </h1>
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
                       fallback={NotFound} />
            </td>
            <td className="capitalize">{attacker.pokemonName}</td>
            <td>{attacker.maxMoveName}</td>
            <td className="damage">{attacker.damage}</td>
          </tr>;
        }))}
      </tbody>
    </table>
    <ConfigureTooltip id="attacker-tooltip"
                      variant={'light'}
                      style={{padding: '0'}}
                      clickable
                      openOnClick>
      <div onClick={() => setContent(<AttackerExplanation />)}>About Max Attacks</div>
      <div>Help <HelpCircleIcon /></div>
    </ConfigureTooltip>
  </AttackerSectionContainer>;
}
