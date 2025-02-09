package com.antarticuno.dmax.controller;

import com.antarticuno.dmax.entity.PokemonEntity;
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

import java.util.Optional;

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
    public Optional<PokemonDTO> getPokemonFromDb(@RequestParam Integer pokemonId) {
        return pokemonManagerService.getPokemonFromDb(pokemonId)
                .map(pokemonEntity ->
                        PokemonDTO.builder()
                                .pokemonName(pokemonEntity.getName())
                                .pokemonId(pokemonEntity.getPokemonKey())
                                .attack(pokemonEntity.getAttack())
                                .defense(pokemonEntity.getDefense())
                                .stamina(pokemonEntity.getStamina())
                                .primaryType(pokemonEntity.getType1())
                                .secondaryType(pokemonEntity.getType2())
                                .imgUrl(pokemonEntity.getImgUrl())
                                .build());
    }

    /**
     * Searches for pokemon from the global API
     * @param pokemonId the pokemon id in question
     */
    @GetMapping("/fetch")
    public Optional<JSONObject> getPokemonFromApi(@RequestParam Integer pokemonId) {
        return pokemonManagerService.getPokemonFromApi(pokemonId);
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
