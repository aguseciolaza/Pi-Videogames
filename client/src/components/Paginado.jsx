import React from "react";
import './Styles/Paginado.css'

export default function Paginado({gamesPerPage, totalGames, paginado}){
    const pageNumbers=[] 
    for (let i=1 ; i<= Math.ceil(totalGames/gamesPerPage) ; i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="items">
                {
                    pageNumbers &&
                    pageNumbers.map(n =>(
                        <li key={n}>
                            <a onClick={() => paginado(n)}>{n}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}