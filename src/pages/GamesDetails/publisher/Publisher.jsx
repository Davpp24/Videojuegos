"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom" // Cambiado de "next/link" a "react-router-dom"
import { fetchAllPublisher } from "../../../service/publisher"

const Publishers = () => {
  const [publishers, setPublishers] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const loadPublishers = async () => {
      try {
        setLoading(true)
        const { results, count } = await fetchAllPublisher(searchTerm, page)
        setPublishers(results)
        setTotalPages(Math.ceil(count / 40))
      } catch (err) {
        setError("Error al cargar los publishers")
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      loadPublishers()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, page])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setPage(1)
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
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar publishers..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md mx-auto block px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-yellow-400"
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <p className="text-yellow-400 text-xl font-semibold animate-pulse">Cargando publishers...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {publishers.map((publisher) => (
                <Link
                  key={publisher.id}
                  to={`/publisherDetails/${publisher.id}`} // Usando "to" en lugar de "href" para React Router
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
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-800 text-yellow-400 rounded-md disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-yellow-400">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-800 text-yellow-400 rounded-md disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Publishers

