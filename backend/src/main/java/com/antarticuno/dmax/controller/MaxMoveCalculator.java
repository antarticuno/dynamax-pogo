package com.antarticuno.dmax.controller;

import com.antarticuno.dmax.model.HealerPokemonDTO;
import com.antarticuno.dmax.repository.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * For handling the requests for max move calculations
 */
@RestController
public class MaxMoveCalculator {

    @Autowired
    private PokemonRepository pokemonRepository;

    // FIXME
    @GetMapping("/strike")
    public void bestAttackersForBoss(Integer bossPokemonId) {

    }

    @GetMapping("/guard")
    public void bestDefendersForBoss(Integer bossPokemonId) {

    }

    @GetMapping("/spirit")
    public List<HealerPokemonDTO> bestHealers(@RequestParam(defaultValue = "5") Integer limit) {
        return pokemonRepository.findBestHealers(PageRequest.of(0, limit));
    }

}
