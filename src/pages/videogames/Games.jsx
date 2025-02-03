import { useEffect, useState } from "react";
/* import { getGamesBy } from '../../services/games'; */

import GamesPoster from '../../components/GamesPoster'

function Games() {

    const [isLoading, setIsLoading] = useState(true);
    const [games, setgames] = useState([]);
  
    //load films...
  
    return (
      <section className="">
        <h1 className='font-rubiksh text-yellow-400 font-extrabold text-4xl mb-3'>Juegos Disponibles</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2  lg:grid-cols-4 ">
  
          {
          //showFilms
          }
  
        </div>
  
      </section>
    )
  }
  
  export default Games