import { useState } from "react";

import Cards from './Cards';
import '../styles/App.css'


function App() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cardsOrder, setCardsOrder] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [animation, setAnimation] = useState("grow 0.2s 1");

  const shuffleOrder = (array) => {
    const clonedArray = array.slice();
    for (let i = clonedArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
    }
    return clonedArray;
  }

  const onCardClick = (id) => {
    setAnimation("shrink 0.2s 1");
    console.log(clickedCards);
    const cardId = id;
    if (!clickedCards.includes(cardId)) {
      setClickedCards([...clickedCards, cardId]);
      addToScore();
    } else {
      resetGame();
    }
  }

  const onAnimationEnd = (event) => {
    if (event.animationName === "shrink") {
      setCardsOrder(shuffleOrder(cardsOrder));
      setAnimation("grow 0.2s 1")
    }
    if (event.animationName === "grow") {
      setAnimation(null)
    }
  }

  const getCards = () => (<Cards num={9} onCardClick={onCardClick} order={cardsOrder} animation={animation} onAnimationEnd={onAnimationEnd}></Cards>)

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
