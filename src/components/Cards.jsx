import { useState, useEffect } from "react";
import "../styles/Card.css"




export default function Cards({ num, onCardClick, order }) {
  const [data, setData] = useState(null);
  const url = (() => `https://dog.ceo/api/breeds/image/random/${num}`)();

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

  const getImages = () => {
    if (data) {
      const images = [];
      const image = (num) => <img className="card" key={num} src={data.message[num]} style={{ order: order[num] }} onClick={() => onCardClick(num)} height="300" width="300" />
      for (let i = 0; i < num; i++) {
        images.push(image(i));
      }
      return images;
    }
  }

  let images = getImages()

  return (
    <div className="cards">
      {images}
    </div>
  )
}