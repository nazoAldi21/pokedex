import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Pokemon } from "@/src/utils/constant";
import { backgroundColors } from "@/src/utils/constant";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

interface PokemonDetailProps {
  pokemons: Pokemon[];
}

const PokemonDetail: React.FC<PokemonDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false); // State untuk menandai apakah Pokémon sudah favorit

  useEffect(() => {
    if (id) {
      const pokemonId = Array.isArray(id) ? id[0] : id;
      fetchPokemonDetail(pokemonId.toString());
    }
  }, [id]);

  useEffect(() => {
    // Mengambil data favorit dari local storage saat komponen dimuat
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const favoriteIds = favorites.map((fav: any) => fav.id);
    setIsFavorite(favoriteIds);
  }, []);

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

  const handleAddToFavorites = (pokemon: any) => {
    // Mengambil data favorit dari local storage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (isFavorite) {
      // Jika Pokémon sudah ada di daftar favorit, maka hapus dari daftar
      const updatedFavorites = favorites.filter(
        (fav: any) => fav.id !== pokemon.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Jika belum ada di daftar favorit, tambahkan ke daftar
      favorites.push(pokemon);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <main className="w-full flex justify-center my-24">
      {pokemon ? (
        <div className="w-8/12 flex flex-row justify-center">
          <div className="w-6/12 flex flex-col justify-start items-start bg-neutral-800 rounded-xl p-4 h-[400px] mr-8">
            <div
              className="flex flex-row justify-center items-center mb-4"
              data-aos="zoom-in-dow"
              data-aos-delay="600"
            >
              <h2 className="text-3xl font-bold capitalize mr-4">
                {pokemon.name}
              </h2>
              <h1 className="text-2xl font-normal capitalize">#{id}</h1>
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
            <button onClick={handleAddToFavorites}>
              {isFavorite ? (
                <span className="flex flex-row justify-center items-center gap-2">
                  <MdFavorite className="text-red-500" />
                  Delete From Favorite
                </span>
              ) : (
                <span className="flex flex-row justify-center items-center gap-2">
                  <MdFavoriteBorder className="text-red-500" />
                  Add To Favorite
                </span>
              )}
            </button>
          </div>
          <div className="w-6/12 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <strong>Basic</strong>
                <ul className="flex flex-col gap-1">
                  <li>Height {pokemon.height / 10} m</li>
                  <li>Weight {pokemon.weight / 10} kg</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <strong>Abilities</strong>
                <ul>
                  {pokemon.abilities.map((ability: any, index: number) => (
                    <li key={index}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <strong>Stats</strong>
                <ul className="grid grid-cols-3 gap-4">
                  {pokemon.stats.map((stat: any, index: number) => (
                    <li key={index} className="flex flex-col gap-1">
                      <span className="capitalize text-sm">
                        {stat.stat.name}
                      </span>
                      <span
                        className="font-semibold bg-red-900 h-3"
                        style={{ width: `${stat.base_stat}px` }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default PokemonDetail;
