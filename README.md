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

## Docker Commands
```
docker build \
 --platform linux/amd64 \
 -t us-west2-docker.pkg.dev/antarticuno-home/docker/dynamax-pogo:1.0.0 \
 .

docker run -d \
  -p 8080:8080 \
  -e USER=_____ \
  -e PASSWORD=_____ \
  -e DB="__________:3306" \
  -e AUTH_TOKEN=__________ \
  --platform=linux/amd64 \
  us-west2-docker.pkg.dev/antarticuno-home/docker/dynamax-pogo:1.0.0
  
docker push us-west2-docker.pkg.dev/antarticuno-home/docker/dynamax-pogo:1.0.0
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
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=213
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=242
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=243
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=244
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=245
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=3
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=302
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=376
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=380
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=381
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
curl -m 70 -X POST http://localhost:8080/api/v1/manage/dynamax?pokemonId=858
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

-- Zacian/Zamazenta
INSERT INTO `pogo`.`pokemon` (`name`, `attack`, `defense`, `stamina`, `type_1`, `type_2`, `img_url`, `max_available`, `pokemon_id`) VALUES ('zacian (crowned)', '332', '240', '192', 'fairy', 'steel', 'https://assets.dittobase.com/go/pokemon/888-zacian.png', '1', '888-crowned-sword');
UPDATE `pogo`.`pokemon` SET `type_2` = NULL, `img_url` = 'https://assets.dittobase.com/go/pokemon/888-zacian-hero.png' WHERE (`pokemon_id` = '888');
UPDATE `pogo`.`pokemon` SET `type_2` = NULL, `img_url` = 'https://assets.dittobase.com/go/pokemon/889-zamazenta-hero.png' WHERE (`pokemon_id` = '889');
INSERT INTO `pogo`.`pokemon` (`name`, `attack`, `defense`, `stamina`, `type_1`, `type_2`, `img_url`, `max_available`, `pokemon_id`) VALUES ('zamazenta (crowned)', '250', '292', '192', 'fighting', 'steel', 'https://assets.dittobase.com/go/pokemon/889-zamazenta.png', '1', '889-crowned-shield');
INSERT INTO `pogo`.`max_move` (`type`, `name`, `power`, `pokemon_id`) VALUES ('steel', 'Behemoth Bash', '350', '889-crowned-shield');
INSERT INTO `pogo`.`max_move` (`type`, `name`, `power`, `pokemon_id`) VALUES ('steel', 'Behemoth Blade', '350', '888-crowned-sword');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('steel', 'Metal Claw', '6', '889-crowned-shield', 'FAST');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('ice', 'Ice Fang', '12', '889-crowned-shield', 'FAST');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('fairy', 'Moonblast', '130', '889-crowned-shield', 'CHARGED');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('normal', 'Giga Impact', '200', '889-crowned-shield', 'CHARGED');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('fighting', 'Close Combat', '105', '889-crowned-shield', 'CHARGED');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('steel', 'Behemoth Bash', '125', '889-crowned-shield', 'CHARGED');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('steel', 'Metal Claw', '6', '888-crowned-sword', 'FAST');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('flying', 'Air Slash', '12', '888-crowned-sword', 'FAST');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('fairy', 'Play Rough', '90', '888-crowned-sword', 'CHARGED');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('fighting', 'Close Combat', '105', '888-crowned-sword', 'CHARGED');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('normal', 'Giga Impact', '200', '888-crowned-sword', 'CHARGED');
INSERT INTO `pogo`.`move` (`type`, `name`, `power`, `pokemon_id`, `variant`) VALUES ('steel', 'Behemoth Blade', '200', '888-crowned-sword', 'CHARGED');

alter table pokemon add column max_cp int(3);
alter table pokemon add column max_cp_boosted int(3);
UPDATE `pogo`.`pokemon` SET `max_cp` = NULL, `max_cp_boosted` = NULL WHERE (`pokemon_id` = '12');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1509', `max_cp_boosted` = '1886' WHERE (`pokemon_id` = '131');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1843', `max_cp_boosted` = '2304' WHERE (`pokemon_id` = '143');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1743', `max_cp_boosted` = '2179' WHERE (`pokemon_id` = '144');
UPDATE `pogo`.`pokemon` SET `max_cp` = '2015', `max_cp_boosted` = '2519' WHERE (`pokemon_id` = '145');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1980', `max_cp_boosted` = '2475' WHERE (`pokemon_id` = '146');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1972', `max_cp_boosted` = '2466' WHERE (`pokemon_id` = '243');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1984', `max_cp_boosted` = '2480' WHERE (`pokemon_id` = '244');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1704', `max_cp_boosted` = '2130' WHERE (`pokemon_id` = '245');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1554', `max_cp_boosted` = '1943' WHERE (`pokemon_id` = '3');
UPDATE `pogo`.`pokemon` SET `max_cp` = '843', `max_cp_boosted` = '1054' WHERE (`pokemon_id` = '302');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1651', `max_cp_boosted` = '2064' WHERE (`pokemon_id` = '6');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1598', `max_cp_boosted` = '1998' WHERE (`pokemon_id` = '615');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1746', `max_cp_boosted` = '2183' WHERE (`pokemon_id` = '68');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1733', `max_cp_boosted` = '2166' WHERE (`pokemon_id` = '766');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1899', `max_cp_boosted` = '2374' WHERE (`pokemon_id` = '812');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1724', `max_cp_boosted` = '2156' WHERE (`pokemon_id` = '815');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1693', `max_cp_boosted` = '2117' WHERE (`pokemon_id` = '818');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1486', `max_cp_boosted` = '1858' WHERE (`pokemon_id` = '849');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1347', `max_cp_boosted` = '1683' WHERE (`pokemon_id` = '870');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1409', `max_cp_boosted` = '1761' WHERE (`pokemon_id` = '9');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1644', `max_cp_boosted` = '2055' WHERE (`pokemon_id` = '94');
UPDATE `pogo`.`pokemon` SET `max_cp` = '1616', `max_cp_boosted` = '2020' WHERE (`pokemon_id` = '99');


```
