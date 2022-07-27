import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getAllGenres, getAllVideogames, filterByCreated, filterByGenre, SortByRating, SortByName, searchGame, refresh, clearVideogames} from '../actions';
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
        return () => {
            dispatch(clearVideogames())
        }
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
        dispatch(filterByCreated(e.target.value))
        setCurrentPage(1)
     }

    function HandlerFilterGenre(e){
        dispatch(filterByGenre(e.target.value)) }

    const [ordenRating, setOrdenRating]= useState("ascRating");
    const [ordenName, setOrdenName]= useState("ascName");


    function handlerSortRating(e){
        e.preventDefault();
        ordenRating === "ascRating" ? setOrdenRating("desRating") : setOrdenRating("ascRating") ;
        dispatch(SortByRating(ordenRating))
        setCurrentPage(1); 
     }

    function handlerSortName(e){
        e.preventDefault();
        ordenName === "ascName" ? setOrdenName("desName") : setOrdenName("ascName") ;
        dispatch(SortByName(ordenName))
        setCurrentPage(1);
    }

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
            <SearchBar className="searchBar" searchGame={searchGame} setCurrentPage={setCurrentPage} />
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
                <button className="sort" onClick={e => handlerSortName(e)}>A - Z </button>
                <button className="sort" onClick={e => handlerSortRating(e)}>0 - 5</button>

                <label className="tit">Filtrado</label>
                <button className="sort" value='api' onClick={e => HandlerFilterCreated(e)}>Existente</button>
                <button className="sort" value='db' onClick={e => HandlerFilterCreated(e)}>Creado</button>

                <h3>Géneros</h3>
                {allGenres?.map((g) => {
                    return (
                    <button className="sort" value={g.name} onClick={e => HandlerFilterGenre(e)}>{g.name}</button>    
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