import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
// import { getAllVideogames } from "../actions";
// import { useSelector, useDispatch } from "react-redux";


export default function Cards(videogames) {
// const dispatch = useDispatch();

    return (
        <div>
            {videogames.map(v => 
            <div>
                <Link to={'/videogames/' + v.id}>
                    <Card image={v.image} name={v.name} genres={v.genres} key={v.id} />
                </Link>
            </div>
            )}
        </div>
    )
}