import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()

  return (
    <div className="min-h-screen bg-blue-900 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">¡Oops!</h1>
        <p className="text-xl text-white mb-4">Lo sentimos, ha ocurrido un error inesperado.</p>
        <p className="text-gray-200">{error.statusText || error.message}</p>
      </div>
    </div>
  )
}
