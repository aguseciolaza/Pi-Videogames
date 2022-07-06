import React from "react";
import { Link } from "react-router-dom";
import './Styles/LandingPage.css'

export default function LandingPage(){
    return(
        <div className="inicio">
            <h1>!Bienvenid@ a mi Proyecto: Videojuegos!</h1>
            <Link to='/home'>
                <button className="button"> Inicio</button>
            </Link>
        </div>
    )
}