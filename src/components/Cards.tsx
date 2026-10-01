import { useState, useEffect } from "react";

export default function Cards() {
  async function loadJson(url) {}
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12")
      .then((response) => {
        console.log(response.json());
      })
      .catch((error) => console.error(error.message));
  }, []);

  return (
    <div className="card-grid">
      <h2>Cards</h2>
    </div>
  );
}
