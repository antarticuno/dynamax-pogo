package com.antarticuno.dmax.repository;

import com.antarticuno.dmax.entity.MaxMoveEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaxMoveRepository extends CrudRepository<MaxMoveEntity, Integer> {
}
