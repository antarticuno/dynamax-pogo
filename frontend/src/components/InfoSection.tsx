import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchPokemon} from "../service/apiClient";
import PokemonInterface from "../types/PokemonInterface";
import styled from "styled-components";

const styleThreshold = 700;

const InfoSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #242424;

  h1 {
    margin: 0;
  }

  h3 {
    margin: 0;
    font-weight: 200;
  }

  .vertical {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }
  
  @media(max-width: ${styleThreshold}px) {
    flex-direction: row;
    position: sticky;
    z-index: 5;
    top: 0;
    padding: 20px 0 30px 0;
    
    h1 {
      font-size: 1.3em;
    }
    
    h3 {
      font-size: 0.9em;
    }
    
    .vertical {
      writing-mode: lr;
      transform: none;
    }
  }
`;

const PokemonImage = styled.img`
  vertical-align: middle;
  margin: 20px 0;
  width: 50%;

  @media(max-width: ${styleThreshold}px) {
    margin: 0 5px;
    width: 20%;
  }
`;

export default function InfoSection() {
  const [searchParams, _setSearchParams] = useSearchParams();
  const pokemonIdParam = searchParams.get('pokemonId');
  const [pokemonId, _setPokemonId] = useState<number | undefined>(!!pokemonIdParam ? Number(pokemonIdParam) : undefined);
  const [pokemon, setPokemon] = useState<PokemonInterface | undefined>(undefined);
  useEffect(() => {
    const initialize = async () => {
      if (pokemonId) {
        const response = await fetchPokemon(pokemonId);
        setPokemon(response);
      }
    };

    initialize();
  }, [pokemonId]);

  return <InfoSectionContainer>
    {pokemon!! && (
      <>
        <div className="vertical">
          <h3 className={"capitalize"}>{pokemon!.primaryType}{!!pokemon!.secondaryType && `| ${pokemon!.secondaryType}`}</h3>
          <h1 className={"capitalize"}>{pokemon!.pokemonName}</h1>
        </div>
        <PokemonImage src={pokemon!.imgUrl} alt={pokemon!.pokemonName} />
      </>
    )}
    <div className="vertical">
      <h3>&nbsp;</h3>
      <h1>Dynamax Guide</h1>
    </div>
  </InfoSectionContainer>;
}
