package com.antarticuno.dmax.service;

import com.antarticuno.dmax.entity.PokemonEntity;
import com.antarticuno.dmax.model.PokemonDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;

public class TestPokemonManagerService {

    @Mock
    protected PokemonEntity pokemonEntity;

    @InjectMocks
    protected PokemonManagerService service;

    @BeforeEach
    protected void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testMapPokemonDTO_Blissey() {
        doReturn("242").when(pokemonEntity).getPokemonKey();
        doReturn("blissey").when(pokemonEntity).getName();
        doReturn("normal").when(pokemonEntity).getType1();
        doReturn(129).when(pokemonEntity).getAttack();
        doReturn(169).when(pokemonEntity).getDefense();
        doReturn(496).when(pokemonEntity).getStamina();
        final PokemonDTO dto = service.mapPokemonToDTO(pokemonEntity);

        assertEquals(129, dto.getAttack());
        assertEquals(169, dto.getDefense());
        assertEquals(496, dto.getStamina());
        assertEquals(1575, dto.getMaxCp());
        assertEquals(1969, dto.getMaxCpBoosted());
    }
}
