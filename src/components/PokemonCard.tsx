import React from "react";
import { Pokemon } from "@/src/utils/constant";
import Link from "next/link";
import { backgroundColors } from "@/src/utils/constant";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {

  // Menyimpan Pokémon ke dalam list favorite local storage
  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.push(pokemon);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  return (
    <div className="pokemon-card flex flex-col justify-center items-start bg-neutral-900 rounded-xl">
      <Link href={`/pokemon/${pokemon.id}`} className="w-full">
        <div
          className="w-full flex justify-center"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-full h-[150px] object-contain"
          />
        </div>
        <div
          className="pokemon-body p-6 flex flex-col justify-start items-start"
          data-aos="fade-left"
          data-aos-delay="500"
        >
          <p className="mb-2"># {pokemon.id}</p>
          <h2 className="capitalize font-semibold mb-5">{pokemon.name}</h2>
          <p>
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className="border-white rounded-full px-3 py-1.5 mr-2 text-sm"
                style={{ backgroundColor: backgroundColors[type] }}
              >
                {type}
              </span>
            ))}
          </p>
        </div>
      </Link>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default PokemonCard;
