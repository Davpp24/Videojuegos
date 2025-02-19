import { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { fetchGameDetails } from "../../service/games"; // Importamos la función desde api.js

export async function loader({ params }) {
  return { id: params.id };
}

export default function GamesDetails() {
  const { id } = useLoaderData();
  const [game, setGame] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGame() {
      setLoading(true);
      const data = await fetchGameDetails(id);
      setGame(data);
      setLoading(false);
    }
    loadGame();
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-gray-900">
      <p className="text-yellow-400 text-2xl font-semibold animate-pulse">Cargando detalles...</p>
    </div>;
  }

  if (!game) {
    return <div className="flex justify-center items-center h-screen bg-gray-900">
      <p className="text-red-500 text-2xl font-semibold">Error al cargar el juego.</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <img
            src={game.background_image || "/placeholder.svg"}
            alt={game.name}
            className="rounded-xl shadow-lg w-full lg:w-1/3 max-h-[500px] object-cover"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">{game.name}</h1>
            <p className="text-lg leading-relaxed text-gray-300 mb-6">{game.description_raw}</p>
            <div className="space-y-4">
              <p><span className="font-semibold text-yellow-400">Fecha de lanzamiento:</span> {game.released || "N/A"}</p>
              <p><span className="font-semibold text-yellow-400">Rating:</span> ⭐ {game.rating}</p>
              <div>
                <p className="font-semibold text-yellow-400">Géneros:</p>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {game.genres.map((genre) => (
                    <li key={genre.id}>
                      <Link to={`/genres/${genre.id}`} className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-600 hover:text-white transition-colors duration-200">
                        {genre.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
