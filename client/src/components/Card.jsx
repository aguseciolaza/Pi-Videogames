import React from "react";


export default function Card ({image, name, genres}) {
    return (
        <div>
            <img src={image} alt="img not found" width='200px' height='250px' />
            <h3>{name}</h3>
            <p>{genres}</p>
        </div>
    )
}