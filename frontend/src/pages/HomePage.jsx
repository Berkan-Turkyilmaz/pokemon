import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPokemonDetails = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const data = response.data.results;

      const pokemonDetails = await Promise.all(
        data.map(async (pokemon) => {
          const detail = await axios.get(pokemon.url);
          //console.log(detail);
          return {
            name: pokemon.name,
            image: detail.data.sprites.front_default,
          };
        })
      );
      console.log(pokemonDetails);
      setPokemonList(pokemonDetails);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPokemonDetails();
  }, []);
  console.log("Pokemon List", pokemonList);
  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Pokemon List</h1>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col hover:cursor-pointer hover:bg-gray-100 items-center justify-center"
          >
            <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24" />
            <p className="mt-2 text-center capitalize hover:underline">
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
