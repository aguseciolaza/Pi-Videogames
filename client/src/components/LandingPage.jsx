import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return(
        <div>
            <h1>!Bienvenido a mi Proyecto: Videogames!</h1>
            <Link to='/home'>
                <button>Home</button>
            </Link>
        </div>
    )
}