package com.antarticuno.dmax.controller;

import com.antarticuno.dmax.model.AttackerPokemonDTO;
import com.antarticuno.dmax.model.DefenderPokemonDTO;
import com.antarticuno.dmax.model.DefenderPokemonResultInfoDTO;
import com.antarticuno.dmax.model.HealerPokemonDTO;
import com.antarticuno.dmax.repository.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * For handling the requests for max move calculations
 */
@RestController
@RequestMapping(value = "/api/v1")
public class MaxMoveCalculator {

    @Autowired
    private PokemonRepository pokemonRepository;

    /**
     * Fetches the best possible attackers (and their dynamax move) used against the given boss.
     * @param bossPokemonId the boss pokemon
     * @param limit the number of pokemon requested - default to 5
     * @return the list of pokemon and how much damage they can deal using their best max moves
     */
    @GetMapping("/strike")
    public List<AttackerPokemonDTO> bestAttackersForBoss(@RequestParam String bossPokemonId,
                                                         @RequestParam(defaultValue = "20") Integer limit) {
        return pokemonRepository.findBestAttackers(bossPokemonId, PageRequest.of(0, limit));
    }

    /**
     * Fetches the defenders and how much damage they take from the charged attacks of the given boss.
     * @param bossPokemonId the boss pokemon
     * @param limit the number of pokemon requested, defaults to no limit
     * @return the list of pokemon and how much damage they take from each move
     */
    @GetMapping("/guard")
    public List<DefenderPokemonDTO> bestDefendersForBoss(@RequestParam String bossPokemonId,
                                                        @RequestParam(defaultValue = "-1") Integer limit) {
        final Map<String, List<DefenderPokemonResultInfoDTO>> defenderMap = pokemonRepository.findBestDefenders(bossPokemonId, PageRequest.of(0, limit < 0 ? Integer.MAX_VALUE : limit))
                .stream()
                .collect(Collectors.groupingBy(DefenderPokemonResultInfoDTO::getPokemonName));
        return defenderMap.keySet()
                .stream()
                .map(defenderName -> {
                    final List<DefenderPokemonResultInfoDTO> damageCalcs = defenderMap.get(defenderName);
                    return DefenderPokemonDTO.builder()
                            .pokemonName(defenderName)
                            .pokemonImgUrl(damageCalcs.stream().map(DefenderPokemonResultInfoDTO::getPokemonImgUrl).findFirst().orElseThrow())
                            .pokemonId(damageCalcs.stream().map(DefenderPokemonResultInfoDTO::getPokemonId).findFirst().orElseThrow())
                            .pokemonStamina(damageCalcs.stream().map(DefenderPokemonResultInfoDTO::getPokemonStamina).findFirst().orElseThrow())
                            .damageCalculations(damageCalcs.stream()
                                    .map(damageCalc -> DefenderPokemonDTO.DamageCalc.builder()
                                            .moveName(damageCalc.getMoveName())
                                            .damage(damageCalc.getDamage())
                                            .build())
                                    .collect(Collectors.toList()))
                            .averageDamageReceived((double) damageCalcs.stream()
                                    .map(DefenderPokemonResultInfoDTO::getDamage)
                                    .mapToInt(Integer::intValue)
                                    .sum() / damageCalcs.size())
                            .build();
                })
                .sorted(Comparator.comparing(DefenderPokemonDTO::getAverageDamageReceived))
                .collect(Collectors.toList());
    }

    /**
     * Fetches the best healers. NOTE: unlike the other endpoints, the boss pokemon doesn't matter
     * @param limit the number of pokemon requested - default 5
     * @return the list of Pokemon and how much they heal
     */
    @GetMapping("/spirit")
    public List<HealerPokemonDTO> bestHealers(@RequestParam(defaultValue = "10") Integer limit) {
        return pokemonRepository.findBestHealers(PageRequest.of(0, limit));
    }

}
