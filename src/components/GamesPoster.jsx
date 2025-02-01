import { Link } from "react-router";

function GamesPoster({ id, title, posterUrl }) {


    return (
        <Link to={`/filmDetails/${id}`} className="">
            <div className="">
                <h2 className="text-black">{title}</h2>
                <img alt={title} title={title} src={posterUrl} className="" />
            </div>
        </Link>
    )
}

export default GamesPoster