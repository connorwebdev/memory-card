import { useState, useEffect } from "react";
import Card from "./Card";

export default function Cards() {
  let [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12")
      .then((response) => response.json())
      .then((data) => {
        setCards(data.results);
      })
      .catch((error) => console.error(error.message));
  }, []);

  return (
    <div className="card-grid">
      {cards.map((card) => {
        return <Card key={card.name} name={card.name} url={card.url}></Card>;
      })}
    </div>
  );
}
