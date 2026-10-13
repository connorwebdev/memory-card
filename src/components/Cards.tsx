import Card from "./Card";
import { type CardData, type CardClickFunction } from "../types";

interface CardsProps {
  cards: CardData[];
  handleCardClick: CardClickFunction;
}

export default function Cards({ cards, handleCardClick }: CardsProps) {
  return (
    <div className="card-grid">
      {cards.map((card) => {
        return (
          <Card
            handleCardClick={handleCardClick}
            key={card.name}
            name={card.name}
            url={card.url}
          />
        );
      })}
    </div>
  );
}
