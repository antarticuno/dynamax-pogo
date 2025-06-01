package com.antarticuno.dmax.controller;

import com.antarticuno.dmax.model.PokemonDTO;
import com.antarticuno.dmax.service.PokemonManagerService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequestMapping("/api/v1/manage")
@RestController
public class PokemonManager {

    @Autowired
    private PokemonManagerService pokemonManagerService;

    /**
     * Searches for pokemon off of the database
     * @param pokemonId the pokemon to search for
     * @return the pokemon if found
     */
    @GetMapping
    public Optional<PokemonDTO> getPokemonFromDb(@RequestParam String pokemonId) {
        return pokemonManagerService.getPokemonFromDb(pokemonId)
                .map(pokemonManagerService::mapPokemonToDTO);
    }

    /**
     * Fetches for all pokemon currently in the database.
     * @return the list of pokemon
     */
    @GetMapping("/all")
    public List<PokemonDTO> getAllPokemonFromDb() {
        return pokemonManagerService.getAllPokemonFromDb().stream()
                .map(pokemonManagerService::mapPokemonToDTO).collect(Collectors.toList());
    }

    /**
     * Searches for pokemon from the global API
     * @param pokemonId the pokemon id in question
     */
    @GetMapping("/fetch")
    public JSONObject getPokemonFromApi(@RequestParam String pokemonId) {
        return pokemonManagerService.getPokemonFromApi(pokemonId).orElse(null);
    }

    /**
     * Fetches the pokemon from the global API and persists it into the database
     * @param pokemonId the pokemon id in question
     */
    @PostMapping
    public void saveNewPokemon(@RequestParam String pokemonId) {
        pokemonManagerService.savePokemonIntoDb(pokemonId);
    }

    /**
     * Upgrades the pokemon in the database and creates new max moves for the pokemon
     * @param pokemonId the pokemon id in question
     */
    @PostMapping("/dynamax")
    public void dynamaxEnablePokemon(@RequestParam String pokemonId) {
        pokemonManagerService.upgradePokemonToDynamax(pokemonId);
    }

    /**
     * Deletes the specified pokemon by id if present
     * @param pokemonId the pokemon id in question
     */
    @DeleteMapping
    public void deletePokemon(@RequestParam String pokemonId) {
        pokemonManagerService.deletePokemon(pokemonId);
    }
}
