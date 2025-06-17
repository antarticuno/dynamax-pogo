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
import {ArrowUpDoubleIcon, Menu01Icon} from "hugeicons-react";
import {Tooltip} from "react-tooltip";
import Bug from "../assets/icon_bug.png";
import Dark from "../assets/icon_dark.png";
import Dragon from "../assets/icon_dragon.png";
import Electric from "../assets/icon_electric.png";
import Fairy from "../assets/icon_fairy.png";
import Fighting from "../assets/icon_fighting.png";
import Fire from "../assets/icon_fire.png";
import Flying from "../assets/icon_flying.png";
import Ghost from "../assets/icon_ghost.png";
import Grass from "../assets/icon_grass.png";
import Ground from "../assets/icon_ground.png";
import Ice from "../assets/icon_ice.png";
import Normal from "../assets/icon_normal.png";
import Poison from "../assets/icon_poison.png";
import Psychic from "../assets/icon_psychic.png";
import Rock from "../assets/icon_rock.png";
import Steel from "../assets/icon_steel.png";
import Water from "../assets/icon_water.png";

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
    
    img {
      width: 1.5em;
      margin-top: 5px;
      transform: rotate(180deg);
    }

    & > span {
      margin: 10px 0;
      
      svg {
        transform: rotate(90deg);
      }
    }
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
    z-index: 3;
    top: 0;
    padding: 10px 0;
    max-width: 100vw;
    background-color: #242424;
    border-bottom: 10px double #fff;
    
    h1 {
      font-size: 1em;
      
      &.clickable::after {
        content: '\u2304';
        vertical-align: text-bottom;
        margin-left: 3px;
      }
    }
    
    h3 {
      font-size: 0.7em;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      
      img {
        transform: unset;
        width: 1.4em;
        height: 1.4em;
        margin-top: 0;
        margin-left: 5px;
        vertical-align: middle;
      }
      
      & > span {
        margin: 0 5px;

        svg {
          transform: unset;
          height: 0.9em;
          width: 0.9em;
        }
      }
      
      &:last-of-type {
        text-align: right;
      }
    }
    
    .vertical {
      writing-mode: lr;
      transform: none;
    }
    
    .rc-image {
      margin: 0 10px;
      width: 15vw;
      height: 15vw;
    }
  }
`;

const BurgerMenu = styled(Tooltip)`
  ul {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    
    li {
      cursor: pointer;
      padding: 5px 15px;
      margin: 0;
      width: 100%;
      list-style-type: none;
      color: #242424;
    }
  }
`;

const PokemonTooltip = styled(Tooltip)`
  text-transform: capitalize;
  z-index: 2;
  
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
      text-align: center;
      margin: 0;
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

  const mapPokemonType = (type?: string) => {
    switch (type) {
      case 'bug':
        return Bug;
      case 'dark':
        return Dark;
      case 'dragon':
        return Dragon;
      case 'electric':
        return Electric;
      case 'fairy':
        return Fairy;
      case 'fighting':
        return Fighting;
      case 'fire':
        return Fire;
      case 'flying':
        return Flying;
      case 'ghost':
        return Ghost;
      case 'grass':
        return Grass;
      case 'ground':
        return Ground;
      case 'ice':
        return Ice;
      case 'normal':
        return Normal;
      case 'poison':
        return Poison;
      case 'psychic':
        return Psychic;
      case 'rock':
        return Rock;
      case 'steel':
        return Steel;
      case 'water':
        return Water;
      default:
        return NotFound;
    }
  }

  const selectNewPokemon = (newId: string) => {
    setSearchParams({['pokemonId']: newId});
    setIsSelecting(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };

  return <InfoSectionContainer>

      <>
        <div className="vertical">
          <h3 className={"capitalize"}>
            {!!currentPokemon?.primaryType && <img src={mapPokemonType(currentPokemon!.primaryType)} title={currentPokemon!.primaryType} alt={currentPokemon!.primaryType} />}
            {!!currentPokemon?.secondaryType && <img src={mapPokemonType(currentPokemon!.secondaryType)} title={currentPokemon!.secondaryType} alt={currentPokemon!.secondaryType} />}
            <span>
              {!!currentPokemon?.maxCp && `${currentPokemon.maxCp}`}
              {!!currentPokemon?.maxCpBoosted && ` • `}
              {!!currentPokemon?.maxCpBoosted && <ArrowUpDoubleIcon />}
              {!!currentPokemon?.maxCpBoosted && `${currentPokemon.maxCpBoosted}`}
            </span>
          </h3>
          {isSelecting ?
            <select
              id={"pokemon-selector"}
              value={currentPokemon?.pokemonId}
              onChange={(e) => selectNewPokemon(e.target.value)}
              onBlur={() => setIsSelecting(false)}
            >
              <option key={-1} value={''}>--select--</option>
              {allPokemon.map(pkmn => {
                return <option key={`select-${pkmn.pokemonId}`} value={pkmn.pokemonId} className={"capitalize"}>{pkmn.pokemonName} - #{pkmn.pokemonNumber}</option>;
              })}
            </select>
            :
            <h1 className="capitalize clickable" onClick={() => setIsSelecting(true)}>{currentPokemon?.pokemonName}</h1>}
        </div>
        {currentPokemon!! && (
          <>
            <Image src={currentPokemon!.imgUrl}
                          alt={currentPokemon!.pokemonName}
                          fallback={NotFound}
                          data-tooltip-id={`selected-pokemon-${currentPokemon!.pokemonNumber}`}
                          className="clickable" />
            <PokemonTooltip id={`selected-pokemon-${currentPokemon!.pokemonNumber}`}>
              {currentPokemon?.pokemonName}
              <ul>
                <li>ATK: {currentPokemon?.attack}</li>
                <li>DEF: {currentPokemon?.defense}</li>
                <li>STA: {currentPokemon?.stamina}</li>
              </ul>
            </PokemonTooltip>
          </>
        )}
      </>
    <div className="vertical">
      <h3>{window.matchMedia(`(max-width: ${styleThreshold}px)`).matches ? <Menu01Icon height={20} width={20} data-tooltip-id="burger" /> : ' '}</h3>
      <h1>Dynamax Guide</h1>
    </div>
    <BurgerMenu id="burger" variant={'light'} place={'bottom-end'} noArrow clickable openOnClick>
      <ul>
        <li onClick={() => scrollToSection("attack-header")}>Attackers</li>
        <li onClick={() => scrollToSection("defend-header")}>Defenders</li>
        <li onClick={() => scrollToSection("heal-header")}>Healers</li>
      </ul>
    </BurgerMenu>
  </InfoSectionContainer>;
}
