"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchPublisherById } from "../../../service/publisher"

const PublisherDetails = () => {
  const { id } = useParams()
  const [publisher, setPublisher] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPublisher = async () => {
      setLoading(true)
      try {
        const data = await fetchPublisherById(id)
        if (!data) {
          throw new Error("No se encontró el publisher")
        }
        setPublisher(data)
      } catch (err) {
        setError(err.message || "Error al obtener información del publisher")
      } finally {
        setLoading(false)
      }
    }
    loadPublisher()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-yellow-400 text-xl font-semibold animate-pulse">Cargando...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <Link to="/publisher" className="text-yellow-400 hover:text-yellow-300 transition-colors">
          Volver a Publishers
        </Link>
      </div>
    )
  }

  if (!publisher) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
        <p className="text-red-500 text-xl mb-4">Publisher no encontrado</p>
        <Link to="/publisher" className="text-yellow-400 hover:text-yellow-300 transition-colors">
          Volver a Publishers
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">{publisher.name}</h1>

          <p className="text-lg text-gray-300 mb-4">
            <span className="font-bold text-yellow-400">Juegos publicados:</span> {publisher.games_count}
          </p>

          <p className="text-base leading-relaxed text-gray-300 mb-6">
            {publisher.description ? publisher.description.replace(/<[^>]*>/g, "") : "No hay descripción disponible."}
          </p>

          <Link
            to="/publisher"
            className="inline-block px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
          >
            Volver a Publishers
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PublisherDetails

