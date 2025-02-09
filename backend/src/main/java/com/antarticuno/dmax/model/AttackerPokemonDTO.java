package com.antarticuno.dmax.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AttackerPokemonDTO {

    private int pokemonId;

    private String pokemonName;

    private String maxMoveName;

    private int damage;
}
