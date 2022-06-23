const {Router} = require('express');
const router = Router();
const axios = require('axios');
const {Videogame} =require('../db');
const {API_KEY} = process.env;

router.get('/:id', async (req,res) => {
    try {
    const {id} = req.params; 
    if(isNaN(id)){
        const gamebyId = await Videogame.findByPk(id)
        return res.status(201).send((gamebyId) ? gamebyId : `El id ${id} no pertenece a ningun videojuego`)
        } else {
        const idGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        if(idGame.data) {
            const gameFound = {
            id: idGame.data.id, 
            name: idGame.data.name, 
            description: idGame.data.description,
            released: idGame.data.released,
            rating: idGame.data.rating,
            parent_platforms: idGame.data.platforms.map(p => p.platform.name).join(', '),
            genres: idGame.data.genres.map(g => g.name).join(', ')
        } 
        return res.status(201).send(gameFound)      
    }}} catch (error) {
        res.status(404).send('Error buscando videojuego by Id')
    }

})

module.exports = router;