import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getAllGenres, getAllVideogames, filterByCreated, filterByGenre, SortByRating, SortByName, getName, searchGame} from '../actions';
import { useDispatch, useSelector } from "react-redux";
import Paginado from "./Paginado";
import Card from "./Card";
import SearchBar from "./SearchBar";


export default function Home(){
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllGenres());
        dispatch(getAllVideogames());
    }, [dispatch]);

    const allGenres = useSelector(state => state.genres);
    const allVideogames = useSelector(state => state.videogames);

    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const indexLastGame = currentPage * gamesPerPage ;
    const indexFirstGame = indexLastGame - gamesPerPage ;
    const currentGames = allVideogames.slice(indexFirstGame, indexLastGame);
    const [orden, setOrden]= useState("");
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function HandlerFilterCreated(e){
        dispatch(filterByCreated(e.target.value))
    }

    function HandlerFilterGenre(e){
        dispatch(filterByGenre(e.target.value))
    }

    function handlerSortRating(e){
        e.preventDefault();
        dispatch(SortByRating(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handlerSortName(e){
        e.preventDefault();
        dispatch(SortByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <h1>HOME</h1>
            <SearchBar searchGame={searchGame} />
            <Link to= '/videogames'>
                <button>Crear Videojuego</button> </Link>
            <select name="Rating" onChange={e => handlerSortRating(e)}>
                <option value='asc'>Asc Rating</option>
                <option value='des'>Desc Rating</option>
            </select>
            <select name="" onChange={e => handlerSortName(e)}> 
            <option value='asc'>Asc ABC</option>
                <option value='des'>Desc ABC</option>
            </select>
            <select name="Genre" onChange={e => HandlerFilterGenre(e)}>
                {allGenres?.map((g) => {
                    return (
                    <option value={g.name}>{g.name}</option>
                    )
                })}
            </select>
            <select name="Created" onChange={e => HandlerFilterCreated(e)}>
                <option value='false'>Existente</option>
                <option value='true'>Agregado</option>
            </select>
            <Paginado gamesPerPage={gamesPerPage} totalGames={allVideogames.length} paginado={paginado}/> 
            {currentGames.map(v => 
            <div>
                <Link to={'/videogames/' + v.id}>
                    <Card image={v.image} name={v.name} genres={v.genres} key={v.id} />
                </Link>
            </div>
            )}
        </div>
    )
} 