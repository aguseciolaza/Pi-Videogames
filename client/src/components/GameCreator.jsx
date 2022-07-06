import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres } from "../actions";
import { Link, useHistory } from "react-router-dom";
import { postVideogame } from "../actions";
import './Styles/GameCreator.css'

function validator(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "Se requiere un nombre"
    } else if (input.name == " ") {
        errors.name = "Se requiere un nombre"
    } else if (!input.platforms.length) {
        errors.platforms = "Se requieren plataformas"
    } else if (!input.genres.length) {
        errors.genres = "Se requieren géneros"
    } else if (!input.description) {
        errors.description = "se requiere una descripción"
    } 
    return errors;
}

export default function GameCreator(){
const dispatch = useDispatch();
const history = useHistory();
useEffect(() => {
    dispatch(getAllGenres())
}, [])
const allGenres = useSelector((state) => state.genres)
const platforms = useSelector((state) => state.platforms)
const [error, setError] = useState({})

const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "", 
    image: "",
    genres: [],
    platforms: []
})

function handlerChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value 
    })
    setError(validator({
        ...input, 
        [e.target.name] : e.target.value
    }))}

function handlerCheckGenres(e){
    setInput({
        ...input,
        genres: [...input.genres, e.target.value]
    })
    setError(validator({
        ...input, 
        [e.target.name] : e.target.value
    }))}

    function handlerCheckPlatform(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        setError(validator({
            ...input, 
            [e.target.name] : e.target.value
        }))}


function handlerSubmit(e){
    e.preventDefault();
    dispatch(postVideogame(input));
    alert('Videojuego creado!')
    setInput({
        name: "",
        description: "",
        released: "",
        rating: "", 
        genres: [],
        platforms: []
    });
    history.push('/home')
}

return (
    <div className="pagina">
        <Link to='/home'><button className="volver">Volver</button></Link>
        <h1>Crea tu Videojuego</h1>
        <p>Agregale nombre, fecha de lanzamiento, puntaje, descripción y selecciona los géneros y las plataformas a los que pertence!</p>
        
        <form onSubmit={(e) => handlerSubmit(e)}>
            <div className="form">
            <div className="forms">
            <div>
                <input 
                className="input"
                type="text"
                placeholder="Nombre"
                value={input.name}
                name="name"
                onChange={(e) => handlerChange(e)}
                />
                { error.name && ( <p className="error">{error.name}</p> )}
            </div>
            <div>
                <input 
                className="input"
                type="date"
                value={input.released}
                name="released"
                onChange={(e) => handlerChange(e)}
                />
            </div>
            <div>
                <input 
                className="input"
                type="number"
                min="0"
                max="5"
                placeholder="Puntaje"
                value={input.rating}
                name="rating"
                onChange={(e) => handlerChange(e)}
                />
            </div>
            <div>
                <input 
                className="inputDescripcion"
                type="textarea"
                placeholder="Descripción"
                value={input.description}
                name="description"
                onChange={(e) => handlerChange(e)}
                />
                { error.description && ( <p className="error">{error.description}</p> )}
            </div>
            <div>
                <input 
                className="input"
                type="text"
                value={input.background_image}
                placeholder="Url imagen"
                name="background_image"
                onChange={(e) => handlerChange(e)}
                />
            </div>
            </div>
            <div className="checks">
                <div className="box">
                    <label className="tituloBox">Géneros</label>
                {allGenres.map((g) => (  
                    <label><input type="checkbox" name={g.name} value={g.name} onChange={(e) => handlerCheckGenres(e)}/>{g.name}</label>
                ))}
                { error.genres && ( <p className="error">{error.genres}</p> )}
                </div>
                <div className="box">
                    <label className="tituloBox">Plataformas</label>
                {platforms.map((p) => (  
                    <label><input type="checkbox" name={p} value={p} onChange={(e) => handlerCheckPlatform(e)}/>{p}</label>
                ))}
                { error.platforms && ( <p className="error">{error.platforms}</p> )}
                </div>
            </div>
            </div>
            <button className="crear" type="submit" >Crear Videojuego</button>
        </form>
    </div>
)

}