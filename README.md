# dynamax-pogo
This is a website for displaying dynamax/gigantamax battle information. The Dynamax mechanic was added to Pokemon GO in the fall of 2024 and has become a polarizing feature due to its difficulty, required cooperation, and strategy. As a community leader in my local area, I wanted to build a tool that could help explain and clarify this mechanic for players in the hopes that it would encourage people to try out these battles more.

## Running Instructions
```
# Both frontend and backend
./gradlew startFrontend bootRun --parallel

# Frontend only
./gradlew startFrontend

# Backend only
./gradlew bootRun
```

## Curls for Fetching All Data
```
curl -m 70 -X POST http://localhost:8080/api/v1/manage?pokemonId=[1-1008]
```

## Generate Curls
```
create table current_max_pokemon as
select name, max_available from pokemon where max_available = 1;

select concat('curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=', pokemon_id) from pokemon join current_max_pokemon using (name);
```

## Curls for Current Dynamax/Gigantamax Pokemon
```
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=12
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=131
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=143
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=144
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=145
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=146
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=242
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=243
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=244
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=245
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=3
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=302
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=376
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=521
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=530
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=555
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=6
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=615
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=68
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=766
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=812
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=815
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=818
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=820
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=823
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=832
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=849
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=870
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=9
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=94
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=99
```

## Manual Edits
```
UPDATE `pogo`.`pokemon` SET `img_url` = 'https://assets.dittobase.com/go/pokemon/555-darmanitan-standard.png' WHERE (`pokemon_id` = '555');
UPDATE `pogo`.`pokemon` SET `img_url` = 'https://assets.dittobase.com/go/pokemon/849-toxtricity-amped.png' WHERE (`pokemon_id` = '849');
-- Urshifu
INSERT INTO `pogo`.`pokemon` (`name`, `attack`, `defense`, `stamina`, `type_1`, `type_2`, `img_url`, `max_available`, `pokemon_id`) VALUES ('urshifu (single strike)', '254', '177', '225', 'fighting', 'dark', 'https://assets.dittobase.com/go/pokemon/892-urshifu-single-strike.png', '1', '892-single-strike');
INSERT INTO `pogo`.`pokemon` (`name`, `attack`, `defense`, `stamina`, `type_1`, `type_2`, `img_url`, `max_available`, `pokemon_id`) VALUES ('urshifu (rapid strike)', '254', '177', '225', 'fighting', 'water', 'https://assets.dittobase.com/go/pokemon/892-urshifu-rapid-strike.png', '1', '892-rapid-strike');
insert into move
select type, name, power, concat(pokemon_id, '-rapid-strike'), null, variant from move where pokemon_id = '892';
insert into move
select type, name, power, concat(pokemon_id, '-single-strike'), null, variant from move where pokemon_id = '892';
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('water', 'Aqua Jet', '70', '892-rapid-strike', 'CHARGED');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('water', 'Waterfall', '12', '892-rapid-strike', 'FAST');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('dark', 'Sucker Punch', '8', '892-single-strike', 'FAST');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('dark', 'Payback', '110', '892-single-strike', 'CHARGED');
INSERT INTO `pogo`.`max_move` (`type`, `name`, `power`, `pokemon_id`) VALUES ('fighting', 'Max Knuckle', '350', '892-rapid-strike');
INSERT INTO `pogo`.`max_move` (`type`, `name`, `power`, `pokemon_id`) VALUES ('water', 'Max Geyser', '350', '892-rapid-strike');
INSERT INTO `pogo`.`max_move` (`type`, `name`, `power`, `pokemon_id`) VALUES ('fighting', 'Max Knuckle', '350', '892-single-strike');
INSERT INTO `pogo`.`max_move` (`type`, `name`, `power`, `pokemon_id`) VALUES ('dark', 'Max Darkness', '350', '892-single-strike');

```
