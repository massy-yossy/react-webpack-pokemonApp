//全体のポケモンデータを取得
export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => resolve(data))
  })
}

export const getPokemonData = (data) => {
  return new Promise((resolve, reject) => {
    fetch(data).then((res) => res.json()).then((data) => resolve(data))
  })
}
