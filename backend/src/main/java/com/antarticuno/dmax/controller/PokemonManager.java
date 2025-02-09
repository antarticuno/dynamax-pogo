package com.antarticuno.dmax.controller;

import com.antarticuno.dmax.service.PokemonManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/manage")
@RestController
public class PokemonManager {

    @Autowired
    private PokemonManagerService pokemonManagerService;

    /**
     * Searches for pokemon from the global API
     * @param pokemonId the pokemon id in question
     */
    @GetMapping("/fetch")
    public void getPokemon(@RequestParam Integer pokemonId) {
        pokemonManagerService.getPokemonFromApi(pokemonId);
    }

    /**
     * Fetches the pokemon from the global API and persists it into the database
     * @param pokemonId the pokemon id in question
     */
    @PostMapping
    public void saveNewPokemon(@RequestParam Integer pokemonId) {
        pokemonManagerService.savePokemonIntoDb(pokemonId);
    }

    /**
     * Upgrades the pokemon in the database and creates new max moves for the pokemon
     * @param pokemonId the pokemon id in question
     */
    @PostMapping("/dynamax")
    public void dynamaxEnablePokemon(@RequestParam Integer pokemonId) {
        pokemonManagerService.upgradePokemonToDynamax(pokemonId);
    }

    /**
     * Deletes the specified pokemon by id if present
     * @param pokemonId the pokemon id in question
     */
    @DeleteMapping
    public void deletePokemon(@RequestParam Integer pokemonId) {
        pokemonManagerService.deletePokemon(pokemonId);
    }
}
