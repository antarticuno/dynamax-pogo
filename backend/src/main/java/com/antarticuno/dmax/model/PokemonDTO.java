package com.antarticuno.dmax.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PokemonDTO {
    private String pokemonName;
    private String pokemonId;
    private String primaryType;
    private String secondaryType;
    private int attack;
    private int defense;
    private int stamina;
    private String imgUrl;
}
