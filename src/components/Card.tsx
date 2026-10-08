import { useState, useEffect } from "react";

interface CardInfo {
  id: number;
  name: string;
  hp: number;
  typeId: string;
  image: string;
  flavorText: string;
}

export default function Card({ name, url }) {
  let [cardInfo, setCardInfo] = useState<CardInfo>({
    id: 0,
    name: "",
    hp: 0,
    typeId: null,
    image: null,
    flavorText: "",
  });

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  useEffect(() => {
    async function fetchCardInfo() {
      try {
        const pokemonResponse = await fetch(url);
        const pokemon = await pokemonResponse.json();

        const speciesResponse = await fetch(pokemon.species.url);
        const species = await speciesResponse.json();

        setCardInfo({
          id: pokemon.id,
          name: name,
          hp: pokemon.stats[0].base_stat,
          typeId: pokemon.types[0].type.url.split("/").slice(-2)[0],
          image: pokemon.sprites.front_default,
          flavorText: species.flavor_text_entries[0].flavor_text,
        });
      } catch (err) {
        console.error(err);
      }
    }

    fetchCardInfo();
  }, []);

  return (
    <div className={`card type-${cardInfo.typeId}`}>
      <div className="top">
        <h2>{capitalizeFirstLetter(cardInfo.name)}</h2>
        <div className="info">
          <p className="hp">{cardInfo.hp} HP</p>
          <div className="type-wrap">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/small/${cardInfo.typeId}.png`}
              alt="Type Icon"
            />
          </div>
        </div>
      </div>
      <div className="img-wrap">
        <img src={cardInfo.image} alt={name} />
      </div>
      <p className="flavor">{cardInfo.flavorText}</p>
    </div>
  );
}
