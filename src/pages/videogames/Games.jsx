import { useEffect, useState } from "react";
import GamesPoster from "../../components/GamesPoster";

const Games = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const API_KEY = "e621543c33ee44e48e7b82cfdc83fb23";

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`);
        if (!response.ok) throw new Error("Error al obtener los juegos");

        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
        <h1 className="font-rubiksh text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8 text-center">
          Juegos Disponibles
        </h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar juegos..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-md mx-auto block px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-yellow-400"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-yellow-400 text-xl font-semibold animate-pulse">Cargando juegos...</p>
          </div>
        ) : (
          <>
            {!isLoading && filteredGames.length === 0 && (
              <p className="text-center text-yellow-400 text-xl">
                No se encontraron juegos que coincidan con la búsqueda.
              </p>
            )}
            {!isLoading && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                  >
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
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Games;
