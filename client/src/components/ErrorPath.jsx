import React from "react";
import { Link } from "react-router-dom";


export default function ErrorPath(){
return (
    <div>
        <Link to='/home'><button className="volver">Volver</button></Link>
        <h4>Ups! Lo sentimos.</h4>
        <p>La ruta no está disponible</p>
    </div>
)
}