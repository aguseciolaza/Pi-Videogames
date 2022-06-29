import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const GET_ALL_GENRES = 'GET_ALL_GENRES'
export const SEARCH_GAME = 'SEARCH_GAME'
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const SORT_BY_RATING = 'SORT_BY_RATING'
export const SORT_BY_NAME = 'SORT_BY_NAME'

export function getAllVideogames() {
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/videogames');
        return dispatch({
         type: GET_ALL_VIDEOGAMES, 
         payload: json.data
        })}
}
export function getAllGenres() {
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/genres');
        return dispatch({
         type: GET_ALL_GENRES, 
         payload: json.data
        })}
}
export function filterByCreated(payload) {
return {
    type: FILTER_BY_CREATED,
    payload
}
}
export function filterByGenre(payload) {
    return {
        type: FILTER_BY_GENRE,
        payload
    }    
    }
export function SortByRating(payload) {
    return {
        type: SORT_BY_RATING,
        payload
    }
}
export function SortByName(payload) {
    return {
        type: SORT_BY_NAME,
        payload
    }
}
export function searchGame(game) {
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/videogames?name=${game}`);
        return dispatch({
         type: SEARCH_GAME, 
         payload: json.data
        })}
}