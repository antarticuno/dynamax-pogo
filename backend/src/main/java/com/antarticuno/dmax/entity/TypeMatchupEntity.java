package com.antarticuno.dmax.entity;

import lombok.Data;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import java.util.Objects;

@Data
@Entity
@Table(name = "type_matchup", schema = "pogo", catalog = "")
@IdClass(TypeMatchupEntityPK.class)
public class TypeMatchupEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "attack_type")
    private String attackType;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "defense_type")
    private String defenseType;
    @Basic
    @Column(name = "multiplier")
    private Double multiplier;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TypeMatchupEntity that = (TypeMatchupEntity) o;
        return Objects.equals(attackType, that.attackType) && Objects.equals(defenseType, that.defenseType) && Objects.equals(multiplier, that.multiplier);
    }

    @Override
    public int hashCode() {
        return Objects.hash(attackType, defenseType, multiplier);
    }
}
