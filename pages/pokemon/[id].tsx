import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Pokemon } from "@/src/utils/constant";
import { backgroundColors } from "@/src/utils/constant";

interface PokemonDetailProps {
  pokemon: Pokemon;
}

const PokemonDetail: React.FC<PokemonDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchPokemonDetail(id);
    }
  }, [id]);

  const fetchPokemonDetail = async (pokemonId: string) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokémon detail", error);
    }
  };

  const handleAddToFavorites = () => {
    // Simpan informasi Pokémon ke dalam local storage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    favorites.push(pokemon);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <main className="w-full flex justify-center my-8">
      {pokemon ? (
        <div className="w-8/12 flex flex-row justify-center">
          <div className="w-5/12 flex flex-col justify-start items-start bg-neutral-800 rounded p-4 h-[400px] mr-8">
            <div
              className="flex flex-row justify-center items-center mb-4"
              data-aos="zoom-in-dow"
              data-aos-delay="600"
            >
              <h2 className="text-3xl font-bold capitalize mr-4">
                {pokemon.name}
              </h2>
              <h1 className="text-2xl font-normal capitalize">Pokemon #{id}</h1>
            </div>
            <p>
              {pokemon.types.map((type: any, index: number) => (
                <span
                  key={index}
                  className="border-white rounded-full px-3 py-1.5 mr-2 text-sm"
                  style={{ backgroundColor: backgroundColors[type.type.name] }}
                  data-aos="zoom-in-dow"
                  data-aos-delay="600"
                >
                  {type.type.name}
                </span>
              ))}
            </p>
            <div className="w-full flex justify-center h-full">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                alt={`Pokemon #${id}`}
                className="w-3/5 object-contain"
                data-aos="zoom-in-down"
                data-aos-delay="300"
              />
            </div>
          </div>
          <div className="w-7/12 flex flex-col w-">
            <div>
              <strong>Base Experience:</strong> {pokemon.base_experience}
            </div>
            <div>
              <strong>Height:</strong> {pokemon.height / 10} m
            </div>
            <div>
              <strong>Weight:</strong> {pokemon.weight / 10} kg
            </div>
            <div>
              <strong>Abilities:</strong>
              <ul>
                {pokemon.abilities.map((ability: any, index: number) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Stats:</strong>
              <ul>
                {pokemon.stats.map((stat: any, index: number) => (
                  <li key={index}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={handleAddToFavorites}>Add to Favorites</button>
            <Link href="/pokemon/favourites">Go to Favorites</Link>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default PokemonDetail;
