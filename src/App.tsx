import { useState, useEffect } from "react";
import "./App.css";
import Cards from "./components/Cards";
import { type CardData } from "./types";

function App() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [clickedCards, setClickedCards] = useState<string[]>([]);
  const [hasWon, setHasWon] = useState(false);

  function handleCardClick(cardId: string) {
    if (clickedCards.includes(cardId)) {
      setClickedCards([]);
      setCurrentScore(0);
    } else {
      setClickedCards([...clickedCards, cardId]);
      const runScore = clickedCards.length + 1;
      setCurrentScore(runScore);
      if (runScore > highScore) {
        setHighScore(runScore);
      }
      if (runScore === cards.length) {
        setHasWon(true);
      }
    }
    shuffleCards(cards);
  }

  function resetGame() {
    setHasWon(false);
    setClickedCards([]);
    setHighScore(0);
    setCurrentScore(0);
    shuffleCards(cards);
  }

  function shuffleCards(array: CardData[]) {
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
            Gain points by clicking a unique card. If you click a card you've
            already clicked then the score will be reset. Try to catch 'em all!
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
      {!hasWon ? (
        <Cards cards={cards} handleCardClick={handleCardClick} />
      ) : (
        <>
          <p className="congrats">You won!</p>
          <button onClick={resetGame} className="reset">
            Reset
          </button>
        </>
      )}
    </main>
  );
}

export default App;
