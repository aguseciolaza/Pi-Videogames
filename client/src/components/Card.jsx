import React from "react";
import './Styles/Card.css'


export default function Card ({background_image, name, genres}) {
    const divStyle = {
        display:'flex',
        backgroundImage: 'url(' + background_image + ')',
        backgroundSize:'250px 300px',
        fontFamily: 'Gill Sans',
        margin: '20px',
        height: '350px',
        width: '250px'
    }
    
    return (
        <div className="card">
            <img className="imagenCard" src={background_image} alt="img not found" />
            <h3>{name}</h3>
            <p>{genres}</p>
        </div>
    )
}
