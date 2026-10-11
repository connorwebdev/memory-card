import { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards";

function App() {
  const [cards, setCards] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  function handleCardClick(cardId) {
    if (clickedCards.includes(cardId)) {
      setClickedCards([]);
      setCurrentScore(0);
      console.log("repeat");
    } else {
      setClickedCards([...clickedCards, cardId]);
      setCurrentScore(clickedCards.length + 1);
      clickedCards.length + 1 > highScore
        ? setHighScore(clickedCards.length + 1)
        : null;
      console.log("added");
    }
    shuffleCards(cards);
  }

  function shuffleCards(array) {
    const shuffledCards = [...array];
    for (let i = shuffledCards.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }
    setCards(shuffledCards);
  }

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
    <main>
      <div className="top-wrap">
        <div className="col-1">
          <h1>Pokemon Memory Game</h1>
          <p>
            Gain points by clicking an image. If you click an image you've
            already clicked then the score will be reset.
          </p>
          <p className="credit">
            Photo by{" "}
            <a
              target="_blank"
              href="https://unsplash.com/@rocinante_11?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            >
              Mick Haupt
            </a>{" "}
            on{" "}
            <a
              target="_blank"
              href="https://unsplash.com/photos/red-ceramic-mug-on-brown-wooden-table-KtTF68ZjBak?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            >
              Unsplash
            </a>
          </p>
        </div>
        <div className="col-2">
          <p className="high-score">High Score: {highScore}</p>
          <p className="current-score">Current Score: {currentScore}</p>
        </div>
      </div>
      <Cards cards={cards} handleCardClick={handleCardClick} />
    </main>
  );
}

export default App;
