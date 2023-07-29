import React, { useEffect, useState } from "react";
import "./style/app.scss";
import { getAllPokemon, getPokemonData } from "./utils/pokemon";

const App = () => {
  const url = "https://pokeapi.co/api/v2/pokemon";
  // ローディング用
  const [loading, setLoading] = useState(true);
  //　ポケモンのデータ用
  const [ pokemon, setPokemon ] = useState([])
  useEffect(() => {
    const fecthPokemonData = async () => {
      let res = await getAllPokemon(url);
      getPokemon(res.results);
      setLoading(false);
    };
    fecthPokemonData();
  }, []);

  const getPokemon = async (data) => {
    let pokemonData = await Promise.all(
      data.map((pokemon) => {
        return getPokemonData(pokemon.url)
      })
    )
    setPokemon(pokemonData);
  };

  
  return <div>{loading ? <h1>ローディング中</h1> : <h1>読み込み完了</h1>}</div>;
};

export default App;
