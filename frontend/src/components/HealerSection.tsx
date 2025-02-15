import {useEffect, useState} from "react";
import HealerPokemonInterface from "../types/HealerPokemonInterface";
import {fetchHealerPokemon} from "../service/apiClient";
import styled from "styled-components";
import {FavouriteIcon} from "hugeicons-react";
import Image from "rc-image";
// @ts-ignore
import NotFound from "../assets/not_found.png";
import {useSearchParams} from "react-router-dom";
import HealerExplanation from "./HealerExplanation";

const styleThreshold = 700;

const HealerSectionContainer = styled.div`
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
      top: 0;
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
export default function HealerSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [healerPokemon, setHealerPokemon] = useState<HealerPokemonInterface[]>([]);
  useEffect(() => {
    const initialize = async () => {
      const response = await fetchHealerPokemon();
      setHealerPokemon(response);
    };

    initialize();
  }, [healerPokemon]);

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
    <h1>
      <FavouriteIcon />
      Spirit
    </h1>
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Pokemon</th>
          <th>Damage Healed</th>
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
  </HealerSectionContainer>;
}
