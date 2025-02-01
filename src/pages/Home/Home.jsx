import { useEffect, useState } from "react";
import { getMoviesBy } from '../../services/films';
import { Carousel } from 'flowbite-react';
import { Link } from "react-router";

function Home() {


  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);

  //get films

  return (
    <>
      <section
        className="w-full mb-6 py-12 md:py-24 lg:py-32 xl:py-48"
        style={{
          backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/042/960/123/small/ai-generated-gamepad-in-the-hands-of-a-gamer-on-a-technological-background-neon-lighting-video-games-online-with-friends-winnings-prizes-fun-entertainment-youth-culture-virtual-reality-photo.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl text-gray-500 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Bienvenido a <span className='text-primary-200'> Videojuego Project</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-400">
                La mejor pagina de Videojuegos
              </p>
            </div>
            <div className="space-x-4">
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary-200 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-primary-200/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 "
                to="/Games"
              >
                Imformese sobre cualquier Videojuego
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section>
        <h1 className='font-rubiksh text-3xl text-gray-200 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>Estrenos</h1>
        <div className="h-96 h- mb-2 mt-6 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={2000} className='mb-3 mt-3'>
            {
            //Print films
            }
          </Carousel>
        </div>
      </section>

    </>
  )
}

export default Home