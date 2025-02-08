package com.antarticuno.dmax.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class HealerPokemonDTO {

    private int pokemonId;

    private String pokemonName;

    @Builder.Default
    private double maxHealingAmount = 0.0;
}
