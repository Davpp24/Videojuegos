"use client"

import { useEffect, useState } from "react"
import { useLoaderData, Link } from "react-router-dom"
import { fetchGameDetails } from "../../service/games"

// Exportación del loader
export async function loader({ params }) {
  try {
    const gameDetails = await fetchGameDetails(params.id)
    if (!gameDetails) {
      throw new Error("Game not found")
    }
    return { gameDetails }
  } catch (error) {
    throw new Error("Failed to load game details")
  }
}

// Definición del componente con export default
function GamesDetails() {
  const { gameDetails } = useLoaderData()
  const [game, setGame] = useState(gameDetails)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setGame(gameDetails)
  }, [gameDetails])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-yellow-400 text-2xl font-semibold animate-pulse">Cargando detalles...</p>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl font-semibold">Error al cargar el juego.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Imagen del juego */}
          <img
            src={game.background_image || "/placeholder.svg"}
            alt={game.name}
            className="rounded-xl shadow-lg w-full lg:w-1/3 max-h-[500px] object-cover"
          />

          {/* Información del juego */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">{game.name}</h1>
            <p className="text-lg leading-relaxed text-gray-300 mb-6">{game.description_raw}</p>

            <div className="space-y-4">
              <p>
                <span className="font-semibold text-yellow-400">Fecha de lanzamiento:</span> {game.released || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-yellow-400">Rating:</span> ⭐ {game.rating}
              </p>

              {/* Géneros */}
              <div>
                <p className="font-semibold text-yellow-400">Géneros:</p>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {game.genres?.map((genre) => (
                    <li key={genre.id}>
                      <Link
                        to={`/genres/${genre.id}`}
                        className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm font-medium hover:bg-yellow-500 hover:text-black transition-colors duration-200"
                      >
                        {genre.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Plataformas */}
              <div>
                <p className="font-semibold text-yellow-400">Plataformas:</p>
                <ul className="list-disc list-inside text-gray-300">
                  {game.platforms?.map((platform) => (
                    <li key={platform.platform.id}>{platform.platform.name}</li>
                  ))}
                </ul>
              </div>

              {/* Publisher */}
              <div>
                <p className="font-semibold text-yellow-400">Publisher:</p>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {game.publishers?.map((publisher) => (
                    <li key={publisher.id}>
                      <Link
                        to={`/publisherDetails/${publisher.id}`}
                        className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm font-medium hover:bg-yellow-500 hover:text-black transition-colors duration-200"
                      >
                        {publisher.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <p className="font-semibold text-yellow-400">Tags:</p>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {game.tags?.map((tag) => (
                    <li key={tag.id}>
                      <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm font-medium">
                        {tag.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Exportación por defecto del componente
export default GamesDetails

