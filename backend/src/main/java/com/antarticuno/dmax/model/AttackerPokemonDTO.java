package com.antarticuno.dmax.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AttackerPokemonDTO {

    private String pokemonId;

    private String pokemonName;

    private String pokemonImgUrl;

    private String maxMoveName;

    private int damage;
}
