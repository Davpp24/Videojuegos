import { useState } from "react";
import { Link } from "react-router";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);

  return (
    <>
      <section
        className="w-full mb-6 py-12 md:py-20 lg:py-28 xl:py-36"
        style={{
          backgroundImage: "url('https://wallpapercave.com/wp/wp8391073.jpg')", // Reemplaza esta URL con una imagen de alta resolución
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Bienvenido a <span className="text-yellow-400">Videojuego Project</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl dark:text-gray-300">
                La mejor página de Videojuegos
              </p>
            </div>
            <div className="space-x-4">
              <Link
                className="inline-flex h-9 items-center justify-center px-4 py-2 text-sm font-medium text-yellow-400 disabled:pointer-events-none disabled:opacity-50"

                to="/Games"
              >
                Infórmese sobre cualquier Videojuego
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h1 className="font-rubiksh text-3xl text-yellow-400 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          Nuevos Videojuegos
        </h1>
        <div className="h-96 mb-2 mt-6 sm:h-64 xl:h-80 2xl:h-96">
          {/* Aquí puedes insertar tu carrusel */}
          {/* Ejemplo:
          <Carousel slideInterval={2000} className="mb-3 mt-3">
            {films.map((film, index) => (
              <div key={index}>
                <img src={film.image} alt={film.title} />
                <p>{film.title}</p>
              </div>
            ))}
          </Carousel> */}
        </div>
      </section>
    </>
  );
}

export default Home;