import { useState } from "react";

import Cards from './Card';
import '../styles/App.css'


function App() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);


  const onCardClick = (id) => {
    console.log(clickedCards);
    const cardId = id;
    if (!clickedCards.includes(cardId)) {
      setClickedCards([...clickedCards, cardId]);
      addToScore();
    } else {
      resetGame();
    }
  }

  const getCards = () => (<Cards num={9} onCardClick={onCardClick}></Cards>)

  let cards = getCards();

  const addToScore = () => {
    const newScore = score + 1;
    setScore(newScore);
    if (newScore > highscore) setHighscore(newScore);
  }

  const resetGame = () => {
    setScore(0);
    setClickedCards([]);
  }

  return (
    <div className="app">
      <header>
        <h1>Memory Game</h1>
        <p>Click each image once to win!</p>
      </header>
      {cards}
      <footer>
        <h1>Score: <span>{score}</span></h1>
        <h2>Highscore: <span>{highscore}</span></h2>
      </footer>
    </div>
  )
}

export default App
