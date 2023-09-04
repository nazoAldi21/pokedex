import { useState } from "react"
import { Pokemon } from "./constant";
import axios from "axios"

const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemons = async (url: string) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
    try {
      const response = await axios.get(url);
      const data = response.data;

      const newPokemons: Pokemon[] = data.results.map((pokemon: any) => ({
        id: parseInt(pokemon.url.split("/")[6]),
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokemon.url.split("/")[6]
        }.png`,
        types: [],
      }));

      for (const pokemon of newPokemons) {
        const detailsResponse = await axios.get(`${API_URL}/${pokemon.id}`);
        const detailsData = detailsResponse.data;
        pokemon.types = detailsData.types.map((type: any) => type.type.name);
      }

      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
      setNextPage(data.next);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };