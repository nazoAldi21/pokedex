import React from "react";
import { Pokemon } from "@/src/utils/constant";
import Link from "next/link";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const backgroundColors: { [key: string]: string } = {
    bug: "#A8B820",
    dragon: "#7038F8",
    fairy: "#EE99AC",
    fire: "#F08030",
    ghost: "#705898",
    ground: "#E0C068",
    normal: "#A8A878",
    psychic: "#F85888",
    steel: "#B8B8D0",
    dark: "#705848",
    electric: "#F8D030",
    fighting: "#C03028",
    flying: "#A890F0",
    grass: "#78C850",
    ice: "#98D8D8",
    poison: "#A040A0",
    rock: "#B8A038",
    water: "#6890F0",
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
                className="border-white rounded-full px-3 py-2 mr-2"
                style={{ backgroundColor: backgroundColors[type] }}
              >
                {type}
              </span>
            ))}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
