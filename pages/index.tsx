import React, { useEffect, useState } from "react"
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component"
import { Pokemon } from "@/src/utils/constant"
import PokemonList from "@/src/components/PokemonList"
import PokemonFilter from "@/src/components/PokemonFilter"

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Get data pokemon menggunakan axios
  const fetchPokemons = async (url: string) => {
    try {
      const response = await axios.get(url);
      const data = response.data;

      const newPokemons: Pokemon[] = data.results.map((pokemon: any) => ({
        id: parseInt(pokemon.url.split("/")[6]),
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
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

  useEffect(() => {
    fetchPokemons(API_URL);
  }, []);

  // Handle Item selanjutnya 
  const handleLoadMore = () => {
    if (nextPage) {
      fetchPokemons(nextPage);
    }
  };

  const handleFilterChange = (filterType: string) => {
    // Reset filter jika tidak ada filter yang dipilih
    if (!filterType) {
      fetchPokemons(API_URL);
    } else {
      // Filter berdasarkan jenis Pokemon yang dipilih
      const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.types.includes(filterType)
      );
      setPokemons(filteredPokemons);
    }
  };

  // Mengambil semua jenis Pokemon unik
  const filterTypes = Array.from(
    new Set(pokemons.flatMap((pokemon) => pokemon.types))
  );

  return (
    <main className="w-full flex justify-center items-center my-24">
      <section className="w-9/12 flex flex-col">
        <PokemonFilter
          filterTypes={filterTypes}
          onFilterChange={handleFilterChange}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <InfiniteScroll
            dataLength={pokemons.length}
            next={handleLoadMore}
            hasMore={nextPage !== null}
            loader={<p className="text-center py-7">Loading more...</p>}
          >
            <PokemonList pokemons={pokemons} />
          </InfiniteScroll>
        )}
      </section>
    </main>
  );
};

export default Home;
