package com.antarticuno.dmax.service;

import com.antarticuno.dmax.entity.MaxMoveEntity;
import com.antarticuno.dmax.entity.MoveEntity;
import com.antarticuno.dmax.entity.PokemonEntity;
import com.antarticuno.dmax.model.PokemonDTO;
import com.antarticuno.dmax.repository.MaxMoveRepository;
import com.antarticuno.dmax.repository.MoveRepository;
import com.antarticuno.dmax.repository.PokemonRepository;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.collections4.IteratorUtils;
import org.apache.commons.lang3.tuple.Pair;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Map.entry;

@Log4j2
@Service
public class PokemonManagerService {

    // Public POGO Api URL
    protected static final String API_URL = "https://pokemon-go-api.github.io/pokemon-go-api";
    protected static final String POKEDEX_API = "/api/pokedex";

    @Autowired
    protected PokemonRepository pokemonRepository;

    @Autowired
    protected MoveRepository moveRepository;

    @Autowired
    protected MaxMoveRepository maxMoveRepository;

    /**
     * Helper to make a GET request
     * @param url the url to fetch
     * @return the body of the response as a string
     * @throws Exception
     */
    private String getRequest(String url) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        return response.body();
    }

    public PokemonDTO mapPokemonToDTO(PokemonEntity pokemonEntity) {
        return PokemonDTO.builder()
                        .pokemonName(pokemonEntity.getName())
                        .pokemonId(pokemonEntity.getPokemonKey())
                        .attack(pokemonEntity.getAttack())
                        .defense(pokemonEntity.getDefense())
                        .stamina(pokemonEntity.getStamina())
                        .primaryType(pokemonEntity.getType1())
                        .secondaryType(pokemonEntity.getType2())
                        .imgUrl(pokemonEntity.getImgUrl())
                        .build();
    }

    /**
     * Searches for the pokemon in the database
     * @param pokedexId the pokemon in question
     * @return the pokemon if found
     */
    public Optional<PokemonEntity> getPokemonFromDb(String pokedexId) {
        return pokemonRepository.findById(pokedexId);
    }

    /**
     * Gets all of the pokemon from the db
     * @return
     */
    public List<PokemonEntity> getAllPokemonFromDb() {
        return IteratorUtils.toList(pokemonRepository.findAll().iterator());
    }

    /**
     * Fetches the pokemon details for the given pokedex id
     * @param pokedexId the pokemon to search for
     */
    public Optional<JSONObject> getPokemonFromApi(String pokedexId) {
        final String getUrl = String.format("%s%s/id/%s.json", API_URL, POKEDEX_API, pokedexId);
        try {
            final JSONObject response = new JSONObject(getRequest(getUrl));
            log.info(response);
            return Optional.of(response);
        } catch (Exception e) {
            log.error(e);
        }
        return Optional.empty();
    }

    /**
     * Fetch the given pokemon from the API, then save it into the database
     * @param pokedexId the pokemon in question
     */
    public void savePokemonIntoDb(String pokedexId) {
        if (getPokemonFromDb(pokedexId).isPresent()) {
            throw new UnsupportedOperationException("Can't save this pokemon because it already exists. Try deleting it first.");
        }
        final JSONObject pokemonResponse = getPokemonFromApi(pokedexId).orElseThrow(() -> new RuntimeException("No pokemon with that ID"));

        final PokemonEntity pokemon = new PokemonEntity();
        pokemon.setPokemonKey(String.format("%s", pokemonResponse.getInt("dexNr")));
        pokemon.setName(pokemonResponse.getJSONObject("names").getString("English").toLowerCase());
        pokemon.setAttack(pokemonResponse.getJSONObject("stats").getInt("attack"));
        pokemon.setDefense(pokemonResponse.getJSONObject("stats").getInt("defense"));
        pokemon.setStamina(pokemonResponse.getJSONObject("stats").getInt("stamina"));;
        pokemon.setType1(
                Optional.of(pokemonResponse)
                        .filter(pkmnRes -> !pkmnRes.isNull("primaryType"))
                        .map(pkmnRes -> pkmnRes.getJSONObject("primaryType"))
                        .map(pkmnRes -> pkmnRes.getJSONObject("names"))
                        .map(pkmnRes -> pkmnRes.getString("English"))
                        .map(String::toLowerCase)
                        .orElse(null));
        pokemon.setType2(
                Optional.of(pokemonResponse)
                        .filter(pkmnRes -> !pkmnRes.isNull("secondaryType"))
                        .map(pkmnRes -> pkmnRes.getJSONObject("secondaryType"))
                        .map(pkmnRes -> pkmnRes.getJSONObject("names"))
                        .map(pkmnRes -> pkmnRes.getString("English"))
                        .map(String::toLowerCase)
                        .orElse(null));
        pokemon.setImgUrl(String.format("https://assets.dittobase.com/go/pokemon/%s-%s.png", pokedexId, pokemon.getName()));
        pokemonRepository.save(pokemon);

        // Move processing
        moveRepository.saveAll(generateMoveList(pokemonResponse.getJSONObject("quickMoves"), pokemon.getPokemonKey()));
        moveRepository.saveAll(generateMoveList(pokemonResponse.getJSONObject("cinematicMoves"), pokemon.getPokemonKey()));
        if (pokemonResponse.get("eliteQuickMoves") instanceof JSONObject) {
            moveRepository.saveAll(generateMoveList(pokemonResponse.getJSONObject("eliteQuickMoves"), pokemon.getPokemonKey()));
        }
        if (pokemonResponse.get("eliteCinematicMoves") instanceof JSONObject) {
            moveRepository.saveAll(generateMoveList(pokemonResponse.getJSONObject("eliteCinematicMoves"), pokemon.getPokemonKey()));
        }
    }

    // Gigantamax pokemon mapped to their gmax moves + type
    protected final static Map<String, Pair<String, String>> gigantamaxPokemonMoves = Map.ofEntries(
            entry("venusaur", Pair.of("G-Max Vine Lash", "grass")),
            entry("charizard", Pair.of("G-Max Wildfire", "fire")),
            entry("blastoise", Pair.of("G-Max Cannonade", "water")),
            entry("butterfree", Pair.of("G-Max Befuddle", "bug")),
            entry("pikachu", Pair.of("G-Max Volt Crash", "electric")),
            entry("meowth", Pair.of("G-Max Gold Rush", "normal")),
            entry("machamp", Pair.of("G-Max Chi Strike", "fighting")),
            entry("gengar", Pair.of("G-Max Terror", "ghost")),
            entry("kingler", Pair.of("G-Max Foam Burst", "water")),
            entry("lapras", Pair.of("G-Max Resonance", "ice")),
            entry("eevee", Pair.of("G-Max Cuddle", "normal")),
            entry("snorlax", Pair.of("G-Max Replenish", "normal")),
            entry("garbodor", Pair.of("G-Max Malodor", "poison")),
            entry("melmetal", Pair.of("G-Max Meltdown", "steel")),
            entry("rillaboom", Pair.of("G-Max Drum Solo", "grass")),
            entry("cinderace", Pair.of("G-Max Fireball", "fire")),
            entry("inteleon", Pair.of("G-Max Hydrosnipe", "water")),
            entry("corviknight", Pair.of("G-Max Wind Rage", "flying")),
            entry("orbeetle", Pair.of("G-Max Gravitas", "psychic")),
            entry("dreadnaw", Pair.of("G-Max Stonesurge", "water")),
            entry("coalossal", Pair.of("G-Max Volcalith", "rock")),
            entry("flapple", Pair.of("G-Max Tartness", "grass")),
            entry("appletun", Pair.of("G-Max Sweetness", "grass")),
            entry("sandaconda", Pair.of("G-Max Sandblast", "ground")),
            entry("toxtricity", Pair.of("G-Max Stun Shock", "electric")),
            entry("centiskorch", Pair.of("G-Max Centiferno", "fire")),
            entry("hatterene", Pair.of("G-Max Smite", "fairy")),
            entry("grimmsnarl", Pair.of("G-Max Snooze", "dark")),
            entry("alcremie", Pair.of("G-Max Finale", "fairy")),
            entry("copperajah", Pair.of("G-Max Steelsurge", "steel")),
            entry("duraludon", Pair.of("G-Max Depletion", "dragon")),
            entry("urshifu", Pair.of("G-Max One Blow", "dark"))
    );

    // The list of max moves mapped by type
    protected final Map<String, String> maxMoveNames = Map.ofEntries(
            entry("normal", "Max Strike"),
            entry("grass", "Max Overgrowth"),
            entry("fire", "Max Flare"),
            entry("water", "Max Geyser"),
            entry("fighting", "Max Knuckle"),
            entry("poison", "Max Ooze"),
            entry("dark", "Max Darkness"),
            entry("fairy", "Max Starfall"),
            entry("psychic", "Max Mindstorm"),
            entry("ice", "Max Hailstorm"),
            entry("dragon", "Max Wyrmwind"),
            entry("rock", "Max Rockfall"),
            entry("ground", "Max Quake"),
            entry("flying", "Max Airstream"),
            entry("bug", "Max Flutterby"),
            entry("ghost", "Max Phantasm"),
            entry("steel", "Max Steelspike"),
            entry("electric", "Max Lightning")
    );

    /**
     * Upgrade a pokemon already in the database to be max_available and have max moves.
     * @param pokemonId the pokemon in question
     */
    public void upgradePokemonToDynamax(String pokemonId) {
        final PokemonEntity pokemon = getPokemonFromDb(pokemonId).orElseThrow(() -> new RuntimeException("Pokemon not found."));
        pokemon.setMaxAvailable(true);
        pokemon.setGmaxImgUrl(String.format("https://assets.dittobase.com/go/pokemon/%s-%s-gigantamax.png", pokemon.getPokemonKey(), pokemon.getName()));
        pokemonRepository.save(pokemon);

        final List<MaxMoveEntity> maxMoves = moveRepository.findAllByPokemonKey(pokemonId).stream()
                .filter(move -> "FAST".equals(move.getVariant()))
                .map(move -> MaxMoveEntity.builder()
                        .pokemonKey(move.getPokemonKey())
                        .type(move.getType())
                        .power(350)
                        .name(maxMoveNames.get(move.getType()))
                        .build())
                .distinct()
                .collect(Collectors.toList());
        // Add gigantamax move if available
        if (gigantamaxPokemonMoves.containsKey(pokemon.getName())) {
            maxMoves.add(MaxMoveEntity.builder()
                    .pokemonKey(pokemonId)
                    .type(gigantamaxPokemonMoves.get(pokemon.getName()).getValue())
                    .power(450)
                    .name(gigantamaxPokemonMoves.get(pokemon.getName()).getKey())
                    .build());
        }
        maxMoveRepository.saveAll(maxMoves);
    }

    /**
     * Helper for processing a JSON object to extract fast/charged attacks into MoveEntities.
     * @param jsonObject  the json object in question
     * @param pokemonId   the pokemon that this is for
     * @return a list of generated MoveEntities
     */
    protected List<MoveEntity> generateMoveList(JSONObject jsonObject, String pokemonId) {
        final Iterable<String> keys = jsonObject.keySet();
        final List<MoveEntity> moves = new ArrayList<>();
        for (String key : keys) {
            final JSONObject moveJson = jsonObject.getJSONObject(key);
            final String moveVariant = key.endsWith("FAST") ? "FAST" : "CHARGED";

            final MoveEntity newMove = new MoveEntity();
            newMove.setType(moveJson.getJSONObject("type")
                    .getJSONObject("names")
                    .getString("English")
                    .toLowerCase());
            newMove.setName(moveJson.getJSONObject("names").getString("English"));
            newMove.setPokemonKey(pokemonId);
            newMove.setPower(moveJson.getInt("power"));
            newMove.setVariant(moveVariant);
            moves.add(newMove);
        }
        return moves;
    }

    /**
     * Delete the desired pokemon and all of its associated moves (fk dependencies)
     * @param pokedexId
     */
    public void deletePokemon(String pokedexId) {
        pokemonRepository.deleteById(pokedexId);
    }



}
