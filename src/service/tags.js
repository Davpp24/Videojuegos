const API_KEY = "e621543c33ee44e48e7b82cfdc83fb23"

export async function fetchTags() {
  try {
    const response = await fetch(`https://api.rawg.io/api/tags?key=${API_KEY}`)
    if (!response.ok) {
      throw new Error("Error al obtener los tags")
    }
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error en fetchTags:", error)
    return []
  }
}

export async function fetchTagDetails(tagId) {
  try {
    const response = await fetch(`https://api.rawg.io/api/tags/${tagId}?key=${API_KEY}`)
    if (!response.ok) {
      throw new Error("Error al obtener los detalles del tag")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error en fetchTagDetails:", error)
    return null
  }
}

export async function fetchGamesByTag(tagId, page = 1, pageSize = 20) {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&tags=${tagId}&page=${page}&page_size=${pageSize}`,
    )
    if (!response.ok) {
      throw new Error("Error al obtener los juegos por tag")
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error en fetchGamesByTag:", error)
    return { results: [], count: 0 }
  }
}

