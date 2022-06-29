import React, {useState} from "react";
import { useDispatch } from "react-redux";


export default function SearchBar({searchGame}) {
    const [game, setGame] = useState("");
    const dispatch = useDispatch();


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(searchGame(game)) //me parece que si vuelvo a cargar todo y queda el nombre en el buscador, aca hay que poner el setname vacio de nuevo
        }}>
            <input type="text" 
            placeholder="Videogame..." 
            value={game} 
            onChange={e => setGame(e.target.value)} />
            <input type="submit" 
            value="Buscar"/>
        </form>
    )
}