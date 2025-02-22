"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchGenres } from "../../../service/generos"

export default function GenrePage() {
  const { genreId } = useParams()
  const [games, setGames] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [genreName, setGenreName] = useState("")

  useEffect(() => {
    async function loadGames() {
      setLoading(true)
      const genresData = await fetchGenres()
      const genreGames = genresData.find((genre) => genre.id === Number.parseInt(genreId))?.games || []
      const genre = genresData.find((genre) => genre.id === Number.parseInt(genreId))
      setGenreName(genre?.name || "Género desconocido")
      setGames(genreGames)
      setLoading(false)
    }
    loadGames()
  }, [genreId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8">
        Juegos del Género: {genreName}
      </h1>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <li
              key={game.id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105"
            >
              <Link
                to={`/gamesDetails/${game.id}`}
                className="block text-white font-bold text-lg hover:text-yellow-400 transition duration-300"
              >
                {game.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

