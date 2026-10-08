// import { useState } from "react";
import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";

function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

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
      <Cards />
    </main>
  );
}

export default App;
