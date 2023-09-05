import React, { useEffect, useState } from "react";
import { backgroundColors } from "@/src/utils/constant";
import { MdFavorite } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const Favorites: React.FC = () => {
  const [favoritePokemon, setFavoritePokemon] = useState<any[]>([]);

  useEffect(() => {
    // Mengambil data favorit dari local storage saat komponen dimuat
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavoritePokemon(favorites);
  }, []);

  //Fungsi untuk menghapus pokemon di local storage
  const removeFromFavorites = (pokemonId: number) => {
    const updatedFavorites = favoritePokemon.filter((pokemon) => pokemon.id !== pokemonId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavoritePokemon(updatedFavorites);
  };

  return (
    <div className="w-6/12 my-24">
      <h1 className="text-2xl font-bold mb-6">Favorite Pokémon</h1>
      <div className="flex flex-col justify-center items-start">
        {favoritePokemon.map((pokemon: any) => (
          <div
            key={pokemon.id}
            className="w-full flex flex-row justify-between items-center border-solid border border-neutral-500 rounded-xl mb-3 p-2 hover:border-white"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <div className="flex flex-row items-center">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={`Pokemon #${pokemon.name}`}
                className="w-1/5 object-contain"
                data-aos="fade-right"
                data-aos-delay="300"
              />
              <div>
                {pokemon.name}
              </div>
            </div>
            <div className="flex justify-center">
                <span className="text-2xl text-red-500 mr-4"><MdFavorite/></span>
                <span onClick={() => removeFromFavorites(pokemon.id)} className="text-2xl text-slate-700 cursor-pointer"><RiDeleteBin6Line/></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
