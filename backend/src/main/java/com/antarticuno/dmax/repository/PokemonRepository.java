package com.antarticuno.dmax.repository;

import com.antarticuno.dmax.entity.PokemonEntity;
import com.antarticuno.dmax.model.AttackerPokemonDTO;
import com.antarticuno.dmax.model.DefenderPokemonDTO;
import com.antarticuno.dmax.model.HealerPokemonDTO;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * For fetching the Pokemon
 */
@Repository
public interface PokemonRepository extends CrudRepository<PokemonEntity, Integer> {

    @Query(nativeQuery = true, name="find_attacker_dto")
    List<AttackerPokemonDTO> findBestAttackers(Integer bossPokemonId, Pageable limit);

    @Query(nativeQuery = true, name="find_defender_dto")
    List<DefenderPokemonDTO> findBestDefenders(Integer bossPokemonId, Pageable limit);

    @Query("select new com.antarticuno.dmax.model.HealerPokemonDTO(pokemon.pokemonKey, pokemon.name, 0.16 * pokemon.stamina) " +
            "from PokemonEntity pokemon " +
            "where pokemon.maxAvailable = true " +
            "order by pokemon.stamina desc")
    List<HealerPokemonDTO> findBestHealers(Pageable limit);
}
