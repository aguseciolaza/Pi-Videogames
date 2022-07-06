import React,{ useEffect }  from "react";
import { getVideogameId , cleanDetail} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Styles/GameDetail.css'



export default function GameDetail(props){
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getVideogameId(props.match.params.id));
    return () => {
        dispatch(cleanDetail());
    }
}, []);
const dataVideogame = useSelector((state) => state.videogameDetail);

const divStyle = {
    display:'flex',
    backgroundImage: 'url(' + dataVideogame.background_image + ')',
    width: '100%',
    height: '100vh',
    fontFamily: 'Gill Sans'}

return (
    <div style={divStyle} >
     { (dataVideogame.name) ?   
     <div >
        <Link to='/home'><button className="volver">Volver</button></Link>
        <div className="todo">
        <div className="dataeimg">
        <div className="data">
        <h1>{dataVideogame.name}</h1>
        <h3>Fecha de Lanzamiento: {dataVideogame.released}</h3>
        <h3>Rating: {dataVideogame.rating}</h3>
        <h3>Géneros: {dataVideogame.genres}</h3>
        <h3>Plataformas: {dataVideogame.platforms}</h3>
        </div>
        <img className="imagen" src={dataVideogame.background_image_additional ? dataVideogame.background_image_additional : dataVideogame.background_image}  alt="img not found"></img>
        </div>
        <p dangerouslySetInnerHTML={{__html: dataVideogame.description}}></p>
    </div> 
    </div> : <p>Cargando...</p> }
           
    </div> 
)

}

