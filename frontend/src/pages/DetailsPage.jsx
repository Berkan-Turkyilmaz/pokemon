import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DetailsPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isInRoster, setIsInRoster] = useState(false);
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        setPokemon(response.data);
        const roster = JSON.parse(localStorage.getItem("roster")) || [];
        const alreadyInRoster = roster.some(
          (p) => p.name === response.data.name
        );
        setIsInRoster(alreadyInRoster);
      })
      .catch((error) =>
        console.error("error fetching pokemon details:", error)
      );
  }, [name]);
  const addToRoster = () => {
    const roster = JSON.parse(localStorage.getItem("roster")) || [];
    roster.push(pokemon);
    localStorage.setItem("roster", JSON.stringify(roster));
    alert("Pokemon successfully added to roster.");

    setTimeout(() => {
      window.location.reload();
    }, 250);
  };
  return (
    <div className="container mx-auto p-4">
      {pokemon ? (
        <>
          <h1 className="text-3xl font-bold mb-4 capitalize">{pokemon.name}</h1>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="mb-4"
          />
          <p className="mb-2">
            <b>Height:</b> {pokemon.height}
          </p>
          <p className="mb-2">
            <b>Weight:</b> {pokemon.weight}
          </p>
          <p className="mb-2">
            <b>Types:</b>{" "}
            {pokemon.types.map((type) => type.type.name).join(", ")}
          </p>
          <p className="mb-2">
            <b>Stats:</b>
            {pokemon.stats.map((stat) => {
              return (
                <ul className="ml-4">
                  <li>
                    {stat.stat.name} : {stat.base_stat}
                  </li>
                </ul>
              );
            })}
          </p>
          <button
            onClick={addToRoster}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isInRoster}
          >
            {isInRoster ? "Already in Roster" : " Add to Roster"}
          </button>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
