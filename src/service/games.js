const API_KEY= 'e621543c33ee44e48e7b82cfdc83fb23';

export const fetchGames = async (query = "") => {
  try {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`;
    
    if (query) {
      url += `&search=${query}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los juegos");

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
