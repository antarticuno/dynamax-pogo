package com.antarticuno.dmax.entity;

import lombok.Data;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Data
@Entity
@Table(name = "max_move", schema = "pogo", catalog = "")
public class MaxMoveEntity {
    @Basic
    @Column(name = "type")
    private String type;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "power")
    private int power;
    @Basic
    @Column(name = "pokemon_key")
    private int pokemonKey;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "move_key")
    private int moveKey;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MaxMoveEntity that = (MaxMoveEntity) o;
        return power == that.power && pokemonKey == that.pokemonKey && moveKey == that.moveKey && Objects.equals(type, that.type) && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(type, name, power, pokemonKey, moveKey);
    }
}
