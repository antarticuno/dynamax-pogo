import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchAllPokemon, fetchPokemon} from "../service/apiClient";
import PokemonInterface from "../types/PokemonInterface";
// @ts-ignore
import PokeballBg from "../assets/pokeball.png";
import styled from "styled-components";
// @ts-ignore
import NotFound from "../assets/not_found.png";
import Image from "rc-image";

const styleThreshold = 900;

const InfoSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(36, 36, 36, 0.8);
  max-width: 12vw;

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
    border-radius: 50%;
    width: 8vw;
    height: 8vw;
    background: url(${PokeballBg});
    background-size: cover;
    transform: rotate(40deg);
    margin: 20px 0;
    
    img {
      width: auto;
      height: 100%;
      transform: rotate(-40deg);
    }
  }
  
  @media(max-width: ${styleThreshold}px) {
    flex-direction: row;
    position: sticky;
    z-index: 5;
    top: 0;
    padding: 20px 0 30px 0;
    max-width: 100vw;
    background-color: #242424;
    border-bottom: 10px double #fff;
    
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
    
    .rc-image {
      margin: 0 20px;
      width: 15vw;
      height: 15vw;
    }
  }
`;

export default function InfoSection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSelecting, setIsSelecting] = useState<boolean>(!searchParams.get('pokemonId'));
  const [allPokemon, setAllPokemon] = useState<PokemonInterface[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<PokemonInterface | undefined>(undefined);

  useEffect(() => {
    const initialize = async () => {
      const pokemonId = !!searchParams.get('pokemonId') ? searchParams.get('pokemonId') : undefined;
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
        <Image src={currentPokemon!.imgUrl}
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
