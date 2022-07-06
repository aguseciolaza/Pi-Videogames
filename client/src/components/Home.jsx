import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getAllGenres, getAllVideogames, filterByCreated, filterByGenre, SortByRating, SortByName, searchGame, refresh} from '../actions';
import { useDispatch, useSelector } from "react-redux";
import Paginado from "./Paginado";
import Card from "./Card";
import SearchBar from "./SearchBar";
import './Styles/Home.css'


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

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber) }


    function HandlerFilterCreated(e){
        dispatch(filterByCreated(e.target.value)) }

    function HandlerFilterGenre(e){
        dispatch(filterByGenre(e.target.value)) }

    const [orden, setOrden]= useState(""); //para que es?

    function handlerSortRating(e){
        e.preventDefault();
        dispatch(SortByRating(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`) }

    function handlerSortName(e){
        e.preventDefault();
        dispatch(SortByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`) }

    function handleRefresh(e){
        e.preventDefault();
        dispatch(refresh());
        setCurrentPage(1);
    }

    return (
        <div>
         { allVideogames.length>0 ?    
        <div className="home">
            {/* Encabezado */}
            <header className="header">
            <h1>Inicio</h1>
            <div className="middleHeader">
            <Link to= '/videogame'> <label> Crear Videojuego</label></Link>
            <label className="filtro" for="btn-menu">&#9776;</label>
            <label className="refresh" onClick={e => handleRefresh(e)}>&#8634;</label>
            </div>
            <SearchBar className="searchBar" searchGame={searchGame} />
            </header>
            {/* Fin del encabezado */}
            {/* Renderización juegos y paginado */}
            <div className="cards">
                {allVideogames === "Nombre inexistente" ? <label>No existe ningún videojuego con dicho nombre, prueba otro!</label> 
                : currentGames.map(v => 
                    <div>
                <Link to={'/videogame/' + v.id}>
                    <Card background_image={v.background_image} name={v.name} genres={v.genres} key={v.id} />
                </Link>
                    </div>  )}
            </div> 
            <Paginado gamesPerPage={gamesPerPage} totalGames={allVideogames.length} paginado={paginado}/>
            {/* Fin renderización juegos y paginado*/}
            <input type="checkbox" id="btn-menu" />
            {/* Barra lateral */}
            <div class="container-menu">
                <div class="cont-menu">

                <label className="tit">Ordenamiento</label>
                <label> <input type='checkbox' name="asc" value='asc' onChange={e => handlerSortName(e)} />A - Z </label>
                <label> <input type='checkbox' name="des" value='des' onChange={e => handlerSortName(e)} />Z - A </label>
                <label> <input type='checkbox' name="asc" value='asc' onChange={e => handlerSortRating(e)} />0 - 5  </label>
                <label> <input type='checkbox' name="des" value='des' onChange={e => handlerSortRating(e)} />5 - 0 </label>

                <label className="tit">Filtrado</label>
                <label> <input type='checkbox'  value='api' onChange={e => HandlerFilterCreated(e)} />Existente</label>
                <label> <input type='checkbox'  value='db' onChange={e => HandlerFilterCreated(e)} />Creado</label>

                <h3>Géneros</h3>
                {allGenres?.map((g) => {
                    return (
                    <label><input type='checkbox' value={g.name} onChange={e => HandlerFilterGenre(e)} />{g.name} </label>    
                    )
                })}
                    <label id="x" for="btn-menu">✖️</label>
                </div>
            </div>
            {/* Fin barra lateral */}
           </div> 
          : <p>Cargando...</p> }
        </div>
    )
} 