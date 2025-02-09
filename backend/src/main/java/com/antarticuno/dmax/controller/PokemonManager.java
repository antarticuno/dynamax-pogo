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

    @GetMapping("/fetch")
    public void getPokemon(@RequestParam Integer pokemonId) {
        pokemonManagerService.getPokemonFromApi(pokemonId);
    }

    @PostMapping
    public void saveNewPokemon(@RequestParam Integer pokemonId) {
        pokemonManagerService.savePokemonIntoDb(pokemonId);
    }

    // FIXME
    @DeleteMapping
    public void deletePokemon(@RequestParam Integer pokemonId) {
        pokemonManagerService.deletePokemon(pokemonId);
    }
}
