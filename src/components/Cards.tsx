import { useState, useEffect } from "react";
import Card from "./Card";

export default function Cards() {
  let [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const cardsResponse = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9"
        );
        const parsedCards = await cardsResponse.json();

        setCards(parsedCards.results.sort(() => Math.random() - 0.5));
      } catch (err) {
        console.error(err);
      }
    }

    fetchCards();
  }, []);

  return (
    <div className="card-grid">
      {cards.map((card) => {
        return <Card key={card.name} name={card.name} url={card.url}></Card>;
      })}
    </div>
  );
}
