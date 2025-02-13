package com.antarticuno.dmax.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class DefenderPokemonDTO {

    private int pokemonId;

    private String pokemonName;

    private String pokemonImgUrl;

    private int pokemonStamina;

    private Double averageDamageReceived;

    private List<DamageCalc> damageCalculations;

    @Data
    @Builder
    public static class DamageCalc {

        private String moveName;

        private int damage;
    }
}
