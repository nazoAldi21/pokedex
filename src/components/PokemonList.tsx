import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Pokemon } from "@/src/utils/constant";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
    
  return (
    <div className="pokemon-list grid grid-cols-5 gap-6 mt-6">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
};

export default PokemonList;
