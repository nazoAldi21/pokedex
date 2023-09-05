import React, { useEffect, useState } from "react";
import { backgroundColors } from "@/src/utils/constant";
import { MdFavorite } from "react-icons/md";

const Favorites: React.FC = () => {
  const [favoritePokemon, setFavoritePokemon] = useState<any[]>([]);

  useEffect(() => {
    // Mengambil data favorit dari local storage saat komponen dimuat
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoritePokemon(favorites);
  }, []);

  return (
    <div className="w-6/12 my-12">
      <h1 className="text-2xl font-bold mb-6">Favorite Pokémon</h1>
      <div className="flex flex-col justify-center items-start">
        {favoritePokemon.map((pokemon: any) => (
          <div
            key={pokemon.id}
            className="w-full flex flex-row justify-center items-center border-solid border border-neutral-500 rounded-xl mb-3 p-2 hover:border-white"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <span className="text-3xl text-yellow-300 mr-4"><MdFavorite/></span>
            <div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={`Pokemon #${pokemon.name}`}
                className="w-1/5 object-contain"
                data-aos="fade-right"
                data-aos-delay="300"
              />
            </div>
            <h3>{pokemon.name}</h3>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
