package com.antarticuno.dmax.repository;

import com.antarticuno.dmax.entity.MoveEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoveRepository extends CrudRepository<MoveEntity, Integer> {

    List<MoveEntity> findAllByPokemonKey(Integer pokemonKey);
}
