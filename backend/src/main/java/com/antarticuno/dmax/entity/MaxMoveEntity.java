package com.antarticuno.dmax.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
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
    @Column(name = "pokemon_id")
    private String pokemonKey;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "move_key")
    private int moveKey;
}
