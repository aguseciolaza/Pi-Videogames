import React, {useState} from "react";
import { useDispatch } from "react-redux";
import './Styles/SearchBar.css'

export default function SearchBar({searchGame}) {
    const [game, setGame] = useState("");
    const dispatch = useDispatch();


    return (
        <div className="searchBar">
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(searchGame(game)) //me parece que si vuelvo a cargar todo y queda el nombre en el buscador, aca hay que poner el setname vacio de nuevo
        }}>
            <input className="search" type="text" 
            placeholder="Videogame..." 
            value={game} 
            onChange={e => setGame(e.target.value)} />
            <input className="boton" type="submit" 
            value="Buscar"/>
        </form>
        </div>
    )
}