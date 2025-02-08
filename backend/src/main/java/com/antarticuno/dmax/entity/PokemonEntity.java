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
@Table(name = "pokemon", schema = "pogo", catalog = "")
public class PokemonEntity {
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "attack")
    private int attack;
    @Basic
    @Column(name = "defense")
    private int defense;
    @Basic
    @Column(name = "stamina")
    private int stamina;
    @Basic
    @Column(name = "type_1")
    private String type1;
    @Basic
    @Column(name = "type_2")
    private String type2;
    @Basic
    @Column(name = "img_url")
    private String imgUrl;
    @Basic
    @Column(name = "gmax_img_url")
    private String gmaxImgUrl;

    @Basic
    @Column(name = "max_available")
    private boolean maxAvailable;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "pokemon_key")
    private int pokemonKey;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PokemonEntity that = (PokemonEntity) o;
        return attack == that.attack && defense == that.defense && stamina == that.stamina && pokemonKey == that.pokemonKey && Objects.equals(name, that.name) && Objects.equals(type1, that.type1) && Objects.equals(type2, that.type2) && Objects.equals(imgUrl, that.imgUrl) && Objects.equals(gmaxImgUrl, that.gmaxImgUrl);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, attack, defense, stamina, type1, type2, imgUrl, gmaxImgUrl, pokemonKey);
    }
}
