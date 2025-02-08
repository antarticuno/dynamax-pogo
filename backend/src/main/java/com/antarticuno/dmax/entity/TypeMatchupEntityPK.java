package com.antarticuno.dmax.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class TypeMatchupEntityPK implements Serializable {
    @Column(name = "attack_type")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String attackType;
    @Column(name = "defense_type")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String defenseType;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TypeMatchupEntityPK that = (TypeMatchupEntityPK) o;
        return Objects.equals(attackType, that.attackType) && Objects.equals(defenseType, that.defenseType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(attackType, defenseType);
    }
}
