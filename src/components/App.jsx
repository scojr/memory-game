import { useState } from "react";

import Cards from './Cards';
import '../styles/App.css'

function App() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [cardsOrder, setCardsOrder] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [animation, setAnimation] = useState("grow");
  const [scoreAnimation, setScoreAnimation] = useState(null);
  const [message, setMessage] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [data, setData] = useState(null);

  const shuffleOrder = (array) => {
    const clonedArray = array.slice();
    for (let i = clonedArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
    }
    return clonedArray;
  }

  const onCardClick = (id) => {
    setAnimation("shrink");
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
      setAnimation("grow");
    }
    if (event.animationName === "grow") {
      setAnimation(null);
    }
    if (event.animationName === "score" || event.animationName === "shake") {
      setScoreAnimation(null);
    }
    if (event.animationName === "spin") {
      setMessage(null);
    }
  }

  const getCards = () => (<Cards num={9} data={data} refreshTrigger={refreshTrigger} setData={setData} onCardClick={onCardClick} order={cardsOrder} animation={animation} onCardAnimationEnd={onAnimationEnd}></Cards>)

  let cards = getCards();

  const addToScore = () => {
    setScoreAnimation("score");
    const newScore = score + 1;
    setScore(newScore);
    if (newScore % 9 === 0) newImages();
    if (newScore > highscore) setHighscore(newScore);
  }

  const resetGame = () => {
    setScoreAnimation("shake");
    setScore(0);
    setClickedCards([]);
  }

  const newImages = () => {
    setClickedCards([]);
    setRefreshTrigger(prev => prev + 1)
    setMessage('perfect')
  }

  return (
    <div className="app">
      <header>
        <h1>Memory Game</h1>
        <p>Click each image to increase your score.</p>
        <p>Don't click the same image twice!</p>
      </header>
      <div className={"message" + " " + message} onAnimationEnd={(event) => onAnimationEnd(event)}></div>
      {cards}
      <footer>
        <h1 className={scoreAnimation} onAnimationEnd={(event) => onAnimationEnd(event)}>Score: <span>{score}</span></h1>
        <h2 >Highscore: <span>{highscore}</span></h2>
      </footer>
    </div>
  )
}

export default App
