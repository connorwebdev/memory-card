// import { useState } from "react";
import { useState } from "react";
import "./App.css";
import Cards from "./components/Cards";

function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  return (
    <main>
      <div className="top-wrap">
        <div className="col-1">
          <h1>Pokemon Memory Game</h1>
          <p>
            Gain points by clicking an image. If you click an image you've
            already clicked then the score will be reset.
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
