import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import  {fetchGamesByGenre} from "../../../service/games";

export default function GenerPage() {
  const { genreId } = useParams();
  const [games, setGames] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGames() {
      setLoading(true);
      const data = await fetchGamesByGenre(genreId);
      setGames(data);
      setLoading(false);
    }
    loadGames();
  }, [genreId]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Juegos del Género</h1>
      {isLoading ? (
        <p className="text-yellow-400">Cargando juegos...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <li key={game.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <Link to={`/games/${game.id}`} className="text-white font-bold text-lg hover:underline">
                {game.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
