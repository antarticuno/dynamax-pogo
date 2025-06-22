package com.antarticuno.dmax.entity;

import com.antarticuno.dmax.model.AttackerPokemonDTO;
import com.antarticuno.dmax.model.DefenderPokemonResultInfoDTO;
import lombok.Data;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import java.util.Objects;

@NamedNativeQuery(
        name = "find_attacker_dto",
        query = "select floor(\n" +
                "  (attacker.attack / boss.defense) * \n" +
                "  (power / 2) * \n" +
                "  (case when attacker.type_1 = max_move.type or coalesce(attacker.type_2, '') = max_move.type then 1.2 else 1 end) *\n" +
                "  coalesce(tm1.multiplier, 1) *\n" +
                "  coalesce(tm2.multiplier, 1)\n" +
                "  + 1\n" +
                ") as damage, \n" +
                "attacker.pokemon_id as pokemon_id, \n" +
                "(case when max_move.name like 'G-Max%' then concat('gigantamax ', attacker.name) else attacker.name end) as attacker_name, \n" +
                "(case when max_move.name like 'G-Max%' then attacker.gmax_img_url else attacker.img_url end) as img_url, \n" +
                "attacker.attack as attacker_attack,\n" +
                "attacker.defense as attacker_defense,\n" +
                "attacker.stamina as attacker_stamina,\n" +
                "max_move.name as max_move_name\n" +
                "from pokemon attacker \n" +
                "join max_move using (pokemon_id)\n" +
                "cross join pokemon boss\n" +
                "left join type_matchup tm1 on (max_move.type = tm1.attack_type and boss.type_1 = tm1.defense_type) \n" +
                "left join type_matchup tm2 on (max_move.type = tm2.attack_type and boss.type_2 = tm2.defense_type) \n" +
                "where boss.pokemon_id = ?1\n" +
                "and attacker.max_available = true\n" +
                "order by damage desc",
        resultSetMapping = "attacker_dto"
)
@SqlResultSetMapping(
        name = "attacker_dto",
        classes = @ConstructorResult(
                targetClass = AttackerPokemonDTO.class,
                columns = {
                        @ColumnResult(name = "pokemon_id", type = String.class),
                        @ColumnResult(name = "attacker_name", type = String.class),
                        @ColumnResult(name = "img_url", type = String.class),
                        @ColumnResult(name = "attacker_attack", type = Integer.class),
                        @ColumnResult(name = "attacker_defense", type = Integer.class),
                        @ColumnResult(name = "attacker_stamina", type = Integer.class),
                        @ColumnResult(name = "max_move_name", type = String.class),
                        @ColumnResult(name = "damage", type = Integer.class)
                }
        )
)
@NamedNativeQuery(
        name = "find_defender_dto",
        query = "select floor(\n" +
                "  (boss.attack / defender.defense) * \n" +
                "  (power / 2) * \n" +
                "  (case when boss.type_1 = move.type or coalesce(boss.type_2, '') = move.type then 1.2 else 1 end) *\n" +
                "  coalesce(tm1.multiplier, 1) *\n" +
                "  coalesce(tm2.multiplier, 1)\n" +
                "  + 1\n" +
                ") as damage,\n" +
                "move.name as move_name,\n" +
                "defender.name as defender_name,\n" +
                "defender.img_url as defender_img_url,\n" +
                "defender.attack as defender_attack,\n" +
                "defender.defense as defender_defense,\n" +
                "defender.stamina as defender_stamina,\n" +
                "defender.pokemon_id as pokemon_id\n" +
                "from pokemon boss\n" +
                "join move using (pokemon_id)\n" +
                "cross join pokemon defender\n" +
                "left join type_matchup tm1 on (move.type = tm1.attack_type and defender.type_1 = tm1.defense_type) \n" +
                "left join type_matchup tm2 on (move.type = tm2.attack_type and defender.type_2 = tm2.defense_type) \n" +
                "where move.variant = 'CHARGED'\n" +
                "and boss.pokemon_id = ?1\n" +
                "and defender.max_available = true\n" +
                "order by defender.name, damage asc",
        resultSetMapping = "defender_dto"
)
@SqlResultSetMapping(
        name = "defender_dto",
        classes = @ConstructorResult(
                targetClass = DefenderPokemonResultInfoDTO.class,
                columns = {
                        @ColumnResult(name = "pokemon_id", type = String.class),
                        @ColumnResult(name = "defender_name", type = String.class),
                        @ColumnResult(name = "defender_img_url", type = String.class),
                        @ColumnResult(name = "defender_attack", type = Integer.class),
                        @ColumnResult(name = "defender_defense", type = Integer.class),
                        @ColumnResult(name = "defender_stamina", type = Integer.class),
                        @ColumnResult(name = "move_name", type = String.class),
                        @ColumnResult(name = "damage", type = Integer.class)
                }
        )
)
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

    @Id
    @Column(name = "pokemon_id")
    private String pokemonKey;

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
