import {useContext, useEffect, useState} from "react";
import HealerPokemonInterface from "../types/HealerPokemonInterface";
import {fetchHealerPokemon} from "../service/apiClient";
import styled from "styled-components";
import {FavouriteIcon} from "hugeicons-react";
import Image from "rc-image";
// @ts-ignore
import NotFound from "../assets/not_found.png";
import {useSearchParams} from "react-router-dom";
import HealerExplanation from "./HealerExplanation";
import {Tooltip} from "react-tooltip";
import CustomModalContext from "./CustomModalContext";

const styleThreshold = 1024;

const HealerSectionContainer = styled.div`
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
  
  #healer-table-container {
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
      z-index: 1;
    }

    #healer-table-container {
      max-height: unset;
    }
  }

  @media print {
    font-size: 0.8em;
    color: #242424;
    
    img {
      display: none;
    }

    table {

      td.capitalize {
        font-weight: 600;
      }

      td.damage {
        text-shadow: unset;
        font-weight: 800;
      }
    }
  }
`;

const ConfigureTooltip = styled(Tooltip)`
  z-index: 2;
  
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

export default function HealerSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [healerPokemon, setHealerPokemon] = useState<HealerPokemonInterface[]>([]);
  const {setContent} = useContext(CustomModalContext);

  useEffect(() => {
    const initialize = async () => {
      const response = await fetchHealerPokemon();
      setHealerPokemon(response);
    };

    initialize();
  }, []);

  if (!pokemonId) {
    return <HealerSectionContainer>
      <h1>
        <FavouriteIcon />
        Spirit
      </h1>
      <HealerExplanation />
    </HealerSectionContainer>
  }


  return <HealerSectionContainer>
    <hr id="heal-header" className="hidden" />
    <h1>
      <FavouriteIcon />
      Spirit
      <span data-tooltip-id="healer-tooltip">•••</span>
    </h1>
    <div id="healer-table-container">
      <table>
        <thead>
          <tr>
            <th className="left-align" colSpan={2}>Pokemon</th>
            <th className="left-align">Damage Healed</th>
          </tr>
        </thead>
        <tbody>
          {healerPokemon.map(((healer, idx) => {
            return <tr key={`healer-${idx}`}>
              <td className="preview-image">
                <Image src={healer.pokemonImgUrl}
                       fallback={NotFound} />
              </td>
              <td className="capitalize">{healer.pokemonName}</td>
              <td className="damage">{healer.maxHealingAmount}</td>
            </tr>;
          }))}
        </tbody>
      </table>
    </div>
    <ConfigureTooltip id="healer-tooltip"
                      variant={'light'}
                      style={{padding: '0'}}
                      clickable
                      openOnClick>
      <div onClick={() => setContent(<HealerExplanation />)}>About Max Spirit</div>
    </ConfigureTooltip>
  </HealerSectionContainer>;
}
