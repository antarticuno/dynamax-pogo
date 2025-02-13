import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchAllPokemon, fetchPokemon} from "../service/apiClient";
import PokemonInterface from "../types/PokemonInterface";
import styled from "styled-components";
// @ts-ignore
import NotFound from "../assets/not_found.png";
import Image from "rc-image";

const styleThreshold = 700;

const InfoSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #242424;

  h1 {
    margin: 0;
    
    &.clickable:hover {
      color: #FFF;
      cursor: pointer;
    }
  }

  h3 {
    margin: 0;
    font-weight: 200;
  }

  .vertical {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
  }
  
  .rc-image {
    text-align: center;
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

const PokemonImage = styled(Image)`
  vertical-align: middle;
  margin: 20px 0;
  width: 50%;

  @media(max-width: ${styleThreshold}px) {
    margin: 0 5px;
    width: 20%;
  }
`;

export default function InfoSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSelecting, setIsSelecting] = useState<boolean>(true);
  const [allPokemon, setAllPokemon] = useState<PokemonInterface[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<PokemonInterface | undefined>(undefined);

  useEffect(() => {
    const initialize = async () => {
      const pokemonId = !!searchParams.get('pokemonId') ? Number(searchParams.get('pokemonId')) : undefined;
      if (pokemonId) {
        const response = await fetchPokemon(pokemonId);
        setCurrentPokemon(response);
      }
      const allResponse = await fetchAllPokemon();
      setAllPokemon(allResponse);
    };

    initialize();
  }, [searchParams]);

  const selectNewPokemon = (newId: string) => {
    setSearchParams({['pokemonId']: newId});
    setIsSelecting(false);
  };

  return <InfoSectionContainer>

      <>
        <div className="vertical">
          <h3 className={"capitalize"}>{currentPokemon?.primaryType}{!!currentPokemon?.secondaryType && ` · ${currentPokemon!.secondaryType}`}</h3>
          {isSelecting ?
            <select
              id={"pokemon-selector"}
              value={currentPokemon?.pokemonId}
              onChange={(e) => selectNewPokemon(e.target.value)}
              onBlur={() => setIsSelecting(false)}
            >
              <option key={-1} value={''}>--select--</option>
              {allPokemon.map(pkmn => {
                return <option key={`select-${pkmn.pokemonId}`} value={pkmn.pokemonId} className={"capitalize"}>{pkmn.pokemonName}</option>;
              })}
            </select>
            :
            <h1 className="capitalize clickable" onClick={() => setIsSelecting(true)}>{currentPokemon?.pokemonName}</h1>}
        </div>
        {currentPokemon!! && (
        <PokemonImage src={currentPokemon!.imgUrl}
                      alt={currentPokemon!.pokemonName}
                      fallback={NotFound} />
        )}
      </>
    <div className="vertical">
      <h3>&nbsp;</h3>
      <h1>Dynamax Guide</h1>
    </div>
  </InfoSectionContainer>;
}
