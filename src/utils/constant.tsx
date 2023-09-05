export interface Pokemon {
    id: any;
    name: string;
    image: string;
    types: string[];
    base_experiences: string;
    height: string;
    weight: string;
    abilities: string;
    stats: string;
  }

export const backgroundColors: { [key: string]: string } = {
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