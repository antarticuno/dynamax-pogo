package com.antarticuno.dmax.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class HealerPokemonDTO {

    private String pokemonId;

    private String pokemonName;

    private String pokemonImgUrl;

    @Builder.Default
    private double maxHealingAmount = 0.0;
}
