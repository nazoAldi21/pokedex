import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Pokemon } from "@/src/utils/constant";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  const [favoritePokemon, setFavoritePokemon] = useState<string[]>([]);

  useEffect(() => {
    // Mengambil data favorit dari local storage saat komponen dimuat
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const favoriteIds = favorites.map((fav: any) => fav.id);
    setFavoritePokemon(favoriteIds);
  }, []);

  const handleAddToFavorites = (pokemon: any) => {
    // Mengambil data favorit dari local storage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (favoritePokemon.includes(pokemon.id)) {
      // Jika Pokémon sudah ada di daftar favorit, maka hapus dari daftar
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== pokemon.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavoritePokemon((prevFavorites) =>
        prevFavorites.filter((id) => id !== pokemon.id)
      );
    } else {
      // Jika belum ada di daftar favorit, tambahkan ke daftar
      favorites.push(pokemon);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setFavoritePokemon((prevFavorites) => [...prevFavorites, pokemon.id]);
    }
  };

  return (
    <div className="pokemon-list grid grid-cols-5 gap-6 mt-6">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onAddToFavorites={handleAddToFavorites}
          isFavorite={favoritePokemon.includes(pokemon.id)}
        />
      ))}
    </div>
  );
};

export default PokemonList;
