import { useState, useEffect } from "react";
import "../styles/Cards.css"

export default function Cards({ num, onCardClick, order, animation, onCardAnimationEnd }) {
  const [data, setData] = useState(null);
  const classes = ["cards", animation]
  const url = (() => `https://dog.ceo/api/breeds/image/random/${num}`)();
  const images = [];

  useEffect(() => {
    let ignore = false;
    fetch(url)
      .then(response => response.json())
      .then(response => {
        if (!ignore) {
          setData(response);
        }
      });
    return () => {
      ignore = true;
    };
  }, [url])

  if (data) {
    const image = (num) => <img className="card" key={num} src={data.message[num]} style={{ order: order[num] }} onClick={() => onCardClick(num)} height="300" width="300" onAnimationEnd={onCardAnimationEnd} />
    for (let i = 0; i < num; i++) {
      images.push(image(i));
    }
  }

  return (
    <div className={classes.join(" ")}>
      {images}
    </div>
  )
}