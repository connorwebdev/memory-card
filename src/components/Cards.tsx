import Card from "./Card";

export default function Cards({ cards, handleCardClick }) {
  return (
    <div className="card-grid">
      {cards.map((card) => {
        return (
          <Card
            handleCardClick={handleCardClick}
            key={card.name}
            name={card.name}
            url={card.url}
          ></Card>
        );
      })}
    </div>
  );
}
