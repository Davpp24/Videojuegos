const API_KEY = 'e621543c33ee44e48e7b82cfdc83fb23';

export const fetchAllPublisher = async (query = "", page = 1) => {
  try {
    let url = `https://api.rawg.io/api/publishers?key=${API_KEY}&page_size=40&page=${page}`

    if (query) {
      url += `&search=${query}`
    }

    const response = await fetch(url)
    if (!response.ok) throw new Error("Error al obtener los publishers")

    const data = await response.json()
    return {
      results: data.results || [],
      count: data.count,
    }
  } catch (error) {
    console.error("Error:", error)
    return { results: [], count: 0 }
  }
}

export const fetchPublisherById = async (id) => {
  try {
    const url = `https://api.rawg.io/api/publishers/${id}?key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener el publisher");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};

export const fetchPublisherGames = async (id, page = 1) => {
  try {
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&publishers=${id}&page=${page}&page_size=20`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los juegos del publisher");
    const data = await response.json();
    return {
      results: data.results || [],
      count: data.count
    };
  } catch (error) {
    console.error("Error:", error);
    return { results: [], count: 0 };
  }
};