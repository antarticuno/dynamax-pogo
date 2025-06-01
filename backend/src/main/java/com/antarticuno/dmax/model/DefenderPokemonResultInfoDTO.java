package com.antarticuno.dmax.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class DefenderPokemonResultInfoDTO {

    private String pokemonId;

    private String pokemonName;

    private String pokemonImgUrl;

    private int pokemonStamina;

    private String moveName;

    private int damage;
}
