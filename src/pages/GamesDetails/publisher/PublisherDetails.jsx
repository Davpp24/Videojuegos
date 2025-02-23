"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchPublisherById, fetchPublisherGames } from "../../../service/publisher"

const PublisherDetails = () => {
  const { id } = useParams()
  const [publisher, setPublisher] = useState(null)
  const [games, setGames] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalGames, setTotalGames] = useState(0)
  const gamesPerPage = 20

  useEffect(() => {
    const loadPublisherAndGames = async () => {
      setLoading(true)
      try {
        const publisherData = await fetchPublisherById(id)
        if (!publisherData) {
          throw new Error("No se encontró el publisher")
        }
        setPublisher(publisherData)

        const gamesData = await fetchPublisherGames(id, currentPage)
        setGames(gamesData.results)
        setTotalGames(gamesData.count)
      } catch (err) {
        setError(err.message || "Error al obtener información del publisher")
      } finally {
        setLoading(false)
      }
    }
    loadPublisherAndGames()
  }, [id, currentPage])

  const totalPages = Math.ceil(totalGames / gamesPerPage)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-yellow-400 text-2xl font-bold animate-pulse">Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl font-bold mb-4">{error}</p>
        <Link to="/publisher" className="text-yellow-400 hover:text-yellow-300 transition-colors text-lg">
          Volver a Publishers
        </Link>
      </div>
    )
  }

  if (!publisher) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl font-bold mb-4">Publisher no encontrado</p>
        <Link to="/publisher" className="text-yellow-400 hover:text-yellow-300 transition-colors text-lg">
          Volver a Publishers
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 mb-8 border border-yellow-400">
          <h1 className="text-5xl font-extrabold text-yellow-400 mb-4">{publisher.name}</h1>
          <p className="text-lg leading-relaxed text-gray-300 mb-6">
            {publisher.description ? publisher.description.replace(/<[^>]*>/g, "") : "No hay descripción disponible."}
          </p>
        </div>

        <h2 className="text-3xl font-bold text-yellow-400 mb-6">Juegos publicados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {games.map(game => (
            <Link to={`/gamesDetails/${game.id}`} key={game.id} className="group">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform group-hover:scale-105 border border-gray-700 group-hover:border-yellow-400">
                <img 
                  src={game.background_image || "/placeholder.svg"} 
                  alt={game.name} 
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2 group-hover:text-yellow-300">{game.name}</h3>
                  <p className="text-sm text-gray-400">Lanzamiento: {game.released || 'N/A'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-12">
          <nav className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-l-md border border-yellow-400 bg-gray-800 text-yellow-400 font-medium hover:bg-yellow-400 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Anterior
            </button>
            <span className="px-4 py-2 border-t border-b border-yellow-400 bg-gray-800 text-yellow-400 font-medium">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-r-md border border-yellow-400 bg-gray-800 text-yellow-400 font-medium hover:bg-yellow-400 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Siguiente
            </button>
          </nav>
        </div>

        <Link
          to="/publisher"
          className="inline-block mt-12 px-8 py-3 bg-yellow-500 text-gray-900 rounded-lg font-bold hover:bg-yellow-400 transition-colors duration-300 text-lg"
        >
          Volver a Publishers
        </Link>
      </div>
    </div>
  )
}

export default PublisherDetails