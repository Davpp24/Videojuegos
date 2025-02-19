const API_KEY = 'e621543c33ee44e48e7b82cfdc83fb23';
const BASE_URL = "https://api.rawg.io/api";


export const fetchGamesHome = async () => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
    if (!response.ok) throw new Error("Error al obtener los videojuegos");
    
    const data = await response.json();
    return data.results; // Retorna la lista de juegos
  } catch (error) {
    console.error("Error al obtener los videojuegos:", error);
    return []; // Retorna un array vacío en caso de error
  }
};

export const fetchGames = async (query = "", page = 1) => {
  try {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=${page}`;
    if (query) {
      url += `&search=${query}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los juegos");
    const data = await response.json();
    return { results: data.results || [], count: data.count };
  } catch (error) {
    console.error("Error:", error);
    return { results: [], count: 0 };
  }
};

export async function fetchGameDetails(gameId) {
  try {
    const response = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
    if (!response.ok) throw new Error("Error al obtener los detalles del juego");

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function fetchGamesByGenre(genreId) {
  try {
    const response = await fetch(`${BASE_URL}/games?genres=${genreId}&key=${API_KEY}`);
    if (!response.ok) throw new Error("Error al obtener los juegos del género");

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
