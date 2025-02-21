const API_KEY = 'e621543c33ee44e48e7b82cfdc83fb23';
export async function fetchGenres() {
    try {
      const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      if (!response.ok) {
        throw new Error("Error al obtener los géneros");
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error en fetchGenres:", error);
      return [];
    }
  }
  