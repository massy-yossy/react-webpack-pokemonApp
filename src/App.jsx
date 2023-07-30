import React, { useEffect, useState } from "react";
import "./app.scss";
import { getAllPokemon, getPokemonData } from "./utils/pokemon";
import Card from "./components/card/Card";
import NaviBar from "./components/NaviBar/NaviBar";

const App = () => {
  const url = "https://pokeapi.co/api/v2/pokemon";
  // ローディング用
  const [loading, setLoading] = useState(true);
  //　ポケモンのデータ用
  const [pokemons, setPokemons] = useState([]);
  // 次のポケモンデータ
  const [nextUrl, setNextUrl] = useState("")


  useEffect(() => {
    const fecthPokemonData = async () => {
      let res = await getAllPokemon(url);
      getPokemon(res.results);
      setLoading(false);
      // console.log(res)
      setNextUrl(res.next);
    };
    fecthPokemonData();
  }, []);

  const getPokemon = async (data) => {
    let pokemonData = await Promise.all(
      data.map((pokemon) => {
        return getPokemonData(pokemon.url);
      })
    );
    setPokemons(pokemonData);
  };
  // console.log(pokemons);

  const nextPage = async () => {
    setLoading(true)
    let data = await getAllPokemon(nextUrl);
    // console.log(data)
    await getPokemon(data.results);
    //更に次のページに行くためにURLを更新する
    setNextUrl(data.next);
    setLoading(false)

  }

  return (
    <>
    <NaviBar />
    <div className="App">
      {loading ? (
        <h1>ローディング中</h1>
      ) : (
        <>
          <div className="pokemonDataContainer">
            {pokemons.map((pokemon, i) => (
              <Card key={i} pokemon={pokemon} />
            ))}
          </div>
          <div className="btn">
            <button>前へ</button>
            <button onClick={nextPage}>次へ</button>
          </div>
        </>
      )}
    </div>
    </>
  );
};

export default App;
