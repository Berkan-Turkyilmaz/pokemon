import React, { useEffect, useState } from "react";
import axios from "axios";
export default function BattlePage() {
  const [roster, setRoster] = useState([]);
  const [opponent, setOpponent] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    const storedRoster = JSON.parse(localStorage.getItem("roster")) || 0;
    setRoster(storedRoster);
  }, []);

  const getRandomOpponent = () => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/${
          Math.floor(Math.random() * 100) + 1
        }`
      )
      .then((response) => {
        setOpponent(response.data);
      })
      .catch((error) => console.log("error", error));
  };
  const battle = (pokemon) => {
    if (!opponent) return;
    const userStat = pokemon.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );
    const oppenentStat = opponent.stats.reduce(
      (sum, stat) => sum + stat.base_stat,
      0
    );

    if (userStat > oppenentStat) {
      setBattleResult("You win!");
      setWins(wins + 1);
      setIsSuccess(true);
    } else {
      setBattleResult("You lose!");
      setLosses(losses + 1);
      setIsSuccess(false);
    }

    getRandomOpponent();
  };

  useEffect(() => {
    getRandomOpponent();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Battle</h1>
      <p>
        Wins: {wins} | Losses: {losses}
      </p>
      {battleResult && (
        <p
          className={`mt-4 text-5xl ${
            isSuccess ? "text-green-700" : "text-red-700"
          }`}
        >
          {battleResult}
        </p>
      )}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Your roster</h2>
        <ul className="grid grid-cols-2 gap-4">
          {roster.length > 0 ? (
            roster.map((pokemon, index) => {
              return (
                <li
                  key={index}
                  className="bg-white p-4 rounded shadow hover:bg-gray-100 flex justify-between items-center"
                >
                  {pokemon.name}
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="mb-4"
                  />
                  <>
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
                  </>
                  <buttom
                    onClick={() => battle(pokemon)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 hover:cursor-pointer"
                  >
                    Battle
                  </buttom>
                </li>
              );
            })
          ) : (
            <>No roster!</>
          )}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2">Opponent</h2>
        {opponent ? (
          <>
            <p>{opponent.name}</p>
            <img
              src={opponent.sprites.front_default}
              alt={opponent.name}
              className="mb-4"
            />
            <p className="mb-2">
              <b>Stats:</b>
              {opponent.stats.map((stat) => {
                return (
                  <ul className="ml-4">
                    <li>
                      {stat.stat.name} : {stat.base_stat}
                    </li>
                  </ul>
                );
              })}
            </p>
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
}
