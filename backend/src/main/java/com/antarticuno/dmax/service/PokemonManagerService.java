package com.antarticuno.dmax.service;

import com.antarticuno.dmax.entity.MoveEntity;
import com.antarticuno.dmax.entity.PokemonEntity;
import com.antarticuno.dmax.repository.MoveRepository;
import com.antarticuno.dmax.repository.PokemonRepository;
import lombok.extern.log4j.Log4j2;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Log4j2
@Service
public class PokemonManagerService {

    protected static final String API_URL = "https://pokemon-go-api.github.io/pokemon-go-api";
    protected static final String POKEDEX_API = "/api/pokedex";

    @Autowired
    protected PokemonRepository pokemonRepository;

    @Autowired
    protected MoveRepository moveRepository;

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

    public Optional<PokemonEntity> getPokemonFromDb(Integer pokedexId) {
        return pokemonRepository.findById(pokedexId);
    }

    /**
     * Fetches the pokemon details for the given pokedex id
     * @param pokedexId the pokemon to search for
     */
    public Optional<JSONObject> getPokemonFromApi(Integer pokedexId) {
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

    public void savePokemonIntoDb(Integer pokedexId) {
        if (getPokemonFromDb(pokedexId).isPresent()) {
            throw new UnsupportedOperationException("Can't save this pokemon because it already exists. Try deleting it first.");
        }
        final JSONObject pokemonResponse = getPokemonFromApi(pokedexId).orElseThrow(() -> new RuntimeException("No pokemon with that ID"));

        final PokemonEntity pokemon = new PokemonEntity();
        pokemon.setPokemonKey(pokemonResponse.getInt("dexNr"));
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
        pokemon.setImgUrl(pokemonResponse.getJSONArray("assetForms").getJSONObject(0).getString("image"));
        pokemonRepository.save(pokemon);

        // Move processing
        moveRepository.saveAll(generateMoveList(pokemonResponse.getJSONObject("quickMoves"), pokemon.getPokemonKey()));
        moveRepository.saveAll(generateMoveList(pokemonResponse.getJSONObject("cinematicMoves"), pokemon.getPokemonKey()));
    }

    protected List<MoveEntity> generateMoveList(JSONObject jsonObject, Integer pokemonId) {
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
            newMove.setPower(moveJson.getJSONObject("combat").getInt("power"));
            newMove.setVariant(moveVariant);
            moves.add(newMove);
        }
        return moves;
    }

    /**
     * Delete the desired pokemon and all of its associated moves (fk dependencies)
     * @param pokedexId
     */
    public void deletePokemon(Integer pokedexId) {
        pokemonRepository.deleteById(pokedexId);
    }



}
