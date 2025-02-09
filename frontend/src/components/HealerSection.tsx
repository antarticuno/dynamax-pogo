import {useEffect, useState} from "react";
import HealerPokemonInterface from "../types/HealerPokemonInterface";
import {fetchHealerPokemon} from "../service/apiClient";
import {useSearchParams} from "react-router-dom";
import styled from "styled-components";
import {FavouriteIcon} from "hugeicons-react";

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
  }
`;
export default function HealerSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonId = searchParams.get('pokemonId');
  const [bossPokemonId, _setBossPokemonId] = useState<number | undefined>(!!pokemonId ? Number(pokemonId) : undefined);
  const [healerPokemon, setHealerPokemon] = useState<HealerPokemonInterface[]>([]);
  useEffect(() => {
    const initialize = async () => {
      const response = await fetchHealerPokemon();
      setHealerPokemon(response);
    };

    initialize();
  }, [bossPokemonId]);

  return <HealerSectionContainer>
    <h1>
      <FavouriteIcon />
      Spirit
    </h1>
    <table>
      <thead>
        <tr>
          <th>Pokemon</th>
          <th>Damage Healed</th>
        </tr>
      </thead>
      <tbody>
        {healerPokemon.map(((healer, idx) => {
          return <tr key={`healer-${idx}`}>
            <td className="capitalize">{healer.pokemonName}</td>
            <td>{healer.maxHealingAmount}</td>
          </tr>;
        }))}
      </tbody>
    </table>
  </HealerSectionContainer>;
}
