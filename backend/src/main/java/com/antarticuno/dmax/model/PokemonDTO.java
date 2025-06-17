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
    private Integer maxCp;
    private Integer maxCpBoosted;
    private String imgUrl;

    public int getPokemonNumber() {
        return Integer.parseInt(pokemonId.replaceAll("\\D", ""));
    }
}
