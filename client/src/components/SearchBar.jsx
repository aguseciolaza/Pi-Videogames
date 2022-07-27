import React, {useState} from "react";
import { useDispatch } from "react-redux";
import './Styles/SearchBar.css'

export default function SearchBar({searchGame, setCurrentPage}) {
    const [game, setGame] = useState("");
    const dispatch = useDispatch();

    return (
        <div className="searchBar">
        <form onSubmit={(e) => {
            e.preventDefault();
            dispatch(searchGame(game)) ;
            setGame("");
            setCurrentPage(1);
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