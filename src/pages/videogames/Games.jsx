import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "e621543c33ee44e48e7b82cfdc83fb23";

const Games = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  // Función para obtener juegos de la API
  const fetchGames = async (query = "") => {
    try {
      setLoading(true);
      let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`;
      
      if (query) {
        url += `&search=${query}`;
      }

      console.log(`Fetching: ${url}`);
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener los juegos");

      const data = await response.json();
      setGames(data.results || []);
    } catch (error) {
      console.error("Error:", error);
      setGames([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar juegos al inicio
  useEffect(() => {
    fetchGames();
  }, []);

  // Buscar juegos en la API cuando cambia el término de búsqueda
  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      fetchGames(searchTerm);
    }, 500);

    setTimeoutId(newTimeoutId);
    
    return () => clearTimeout(newTimeoutId);
  }, [searchTerm]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <h1 className="font-rubiksh text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8 text-center">
        Juegos Disponibles
      </h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar juegos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md mx-auto block px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-400"
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-yellow-400 text-xl font-semibold animate-pulse">
            Cargando juegos...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.length > 0 ? (
            games.map((game) => (
              <Link to={`/gamesDetails/${game.id}`} key={game.id}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                  <img
                    src={game.background_image || "/placeholder.svg"}
                    alt={game.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-white mb-2 truncate">{game.name}</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-yellow-400 font-semibold">⭐ {game.rating}</p>
                      <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
                        {game.released ? new Date(game.released).getFullYear() : "N/A"}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {game.genres &&
                        game.genres.slice(0, 3).map((genre) => (
                          <span key={genre.id} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                            {genre.name}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400 text-lg">No se encontraron juegos.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Games;
