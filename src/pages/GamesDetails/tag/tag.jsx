"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchTagDetails, fetchGamesByTag } from "../../../service/tags"

export default function TagPage() {
  const { tagId } = useParams()
  const [tagDetails, setTagDetails] = useState(null)
  const [games, setGames] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalGames, setTotalGames] = useState(0)

  useEffect(() => {
    async function loadTagAndGames() {
      setLoading(true)
      const details = await fetchTagDetails(tagId)
      setTagDetails(details)

      const gamesData = await fetchGamesByTag(tagId, page)
      setGames(gamesData.results)
      setTotalGames(gamesData.count)
      setLoading(false)
    }
    loadTagAndGames()
  }, [tagId, page])

  const loadMoreGames = async () => {
    const nextPage = page + 1
    const gamesData = await fetchGamesByTag(tagId, nextPage)
    setGames((prevGames) => [...prevGames, ...gamesData.results])
    setPage(nextPage)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    )
  }

  if (!tagDetails) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl font-semibold">Error al cargar los detalles del tag.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">{tagDetails.name}</h1>
          <p className="text-xl text-gray-300">{totalGames} juegos asociados</p>
          {tagDetails.description && (
            <div className="mt-4">
              <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Acerca de este tag</h2>
              <p className="text-gray-300 leading-relaxed">{tagDetails.description}</p>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Juegos populares con este tag</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link
              key={game.id}
              to={`/gamesDetails/${game.id}`}
              className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={game.background_image || "/placeholder.svg?height=200&width=400"}
                alt={game.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-yellow-400 mb-2">{game.name}</h3>
                {game.released && (
                  <p className="text-sm text-gray-400">Lanzamiento: {new Date(game.released).toLocaleDateString()}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {games.length < totalGames && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={loadMoreGames}
              className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-full hover:bg-yellow-600 transition duration-300 shadow-lg"
            >
              Cargar más juegos
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

