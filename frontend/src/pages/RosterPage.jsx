import React, { useEffect, useState } from "react";

export default function RosterPage() {
  const [roster, setRoster] = useState([]);
  useEffect(() => {
    const storedRoster = JSON.parse(localStorage.getItem("roster")) || [];
    setRoster(storedRoster);
  }, []);

  // Remove roster
  const removeFromRoster = (name) => {
    const updatedRoster = roster.filter((pokemon) => pokemon.name !== name);
    setRoster(updatedRoster);
    alert("Successfully removed from roster");
    localStorage.setItem("roster", JSON.stringify(updatedRoster));
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">My Roster</h1>
      {roster.length > 0 ? (
        <ul>
          {roster.map((pokemon, index) => {
            return (
              <li
                key={index}
                className="bg-white p-4 rounded shadow hover:bg-gray-100 flex justify-between items-center "
              >
                {pokemon.name}
                <button
                  onClick={() => removeFromRoster(pokemon.name)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <>No data</>
      )}
    </div>
  );
}
