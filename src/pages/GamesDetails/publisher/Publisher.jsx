"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchAllPublisher } from "../../../service/publisher"

const Publishers = () => {
  const [publishers, setPublishers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPublishers = async () => {
      try {
        const { results } = await fetchAllPublisher()
        setPublishers(results)
      } catch (err) {
        setError("Error al cargar los publishers")
      } finally {
        setLoading(false)
      }
    }

    loadPublishers()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-yellow-400 text-xl font-semibold animate-pulse">Cargando publishers...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-xl font-semibold">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Publishers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {publishers.map((publisher) => (
            <Link
              key={publisher.id}
              to={`/publisherDetails/${publisher.id}`}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 flex flex-col group"
            >
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-yellow-400 mb-2 truncate group-hover:text-yellow-300 transition-colors">
                  {publisher.name}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {publisher.description || "No hay descripción disponible"}
                </p>
              </div>
              <div className="bg-gray-700 px-6 py-3 flex justify-between items-center">
                <span className="text-sm text-yellow-400">{publisher.games_count || 0} juegos</span>
                <span className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ver más →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Publishers

