package com.antarticuno.dmax.repository;

import com.antarticuno.dmax.entity.MoveEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoveRepository extends CrudRepository<MoveEntity, Integer> {
}
