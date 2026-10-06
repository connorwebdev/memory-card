import { useState, useEffect } from "react";

interface CardInfo {
  id: number;
  name: string;
  hp: number;
  typeId: string;
  image: string;
}

export default function Card({ name, url }) {
  let [cardInfo, setCardInfo] = useState<CardInfo>({
    id: 0,
    name: "",
    hp: 0,
    typeId: null,
    image: null,
  });

  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/small/12.png

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCardInfo((e) => ({
          ...e,
          id: data.id,
          name: name,
          hp: data.stats[0].base_stat,
          typeId: data.types[0].type.url.split("/").slice(-2)[0],
          image: data.sprites.front_default,
        }));
      })
      .catch((error) => console.error(error.message));
  }, []);

  return (
    <div className="card">
      <div className="top">
        <h2>{capitalizeFirstLetter(cardInfo.name)}</h2>
        <p className="hp">{cardInfo.hp} HP</p>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/small/${cardInfo.typeId}.png`}
          alt="Type Icon"
        />
      </div>
      <img src={cardInfo.image} alt={name} />
    </div>
  );
}
