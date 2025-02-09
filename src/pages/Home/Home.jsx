"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("https://api.rawg.io/api/games?key=e621543c33ee44e48e7b82cfdc83fb23");
        const data = await response.json();
        setGames(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener los videojuegos:", error);
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-pulse text-cyan-500 text-2xl">Cargando los mejores juegos del momento...</div>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    className: "game-slider",
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
      <main className="flex-grow">
        <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80 mix-blend-multiply" />
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
              poster="https://wallpapercave.com/wp/wp8391073.jpg"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-gaming-world-rotates-1393-large.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div className="container relative z-10 px-4 md:px-6 text-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 filter drop-shadow-lg">
                Bienvenido a <span className="text-yellow-400">Videojuego Project</span>
              </h1>
              <p className="text-xl md:text-2xl text-cyan-200 max-w-2xl mx-auto leading-relaxed">
                Explora un universo de aventuras, acción y estrategia con los títulos más esperados y emocionantes de la industria del gaming.
              </p>
              <div className="pt-4">
                <Link
                  className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                  to="/Games"
                >
                  Explorar Juegos
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="games-section relative py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-16">
              <span className="inline-block text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 pb-2">
                Últimos Lanzamientos
              </span>
            </h2>

            <div className="max-w-6xl mx-auto">
              <Slider {...settings}>
                {games.map((game, index) => (
                  <div key={index} className="px-4">
                    <div className="relative group">
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <img
                          src={game.background_image || "/placeholder.svg"}
                          alt={game.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
                        <h3 className="text-2xl font-bold text-white text-center mb-2">{game.name}</h3>
                        <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {game.genres?.slice(0, 3).map((genre, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;


