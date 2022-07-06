const {Router} = require('express');
const router = Router();
const axios = require('axios');
const {Videogame, Genre} =require('../db');
const {API_KEY} = process.env;

router.get('/:id', async (req,res) => {
    try {
    const {id} = req.params; 
    if(isNaN(id)){
        try{
        const gamebyId = await Videogame.findByPk(id, {
            include: [{
                model: Genre,
                attributes: ['name'],
                through: { attributes: [] }
            }]});
        let finalGame = {
                id: gamebyId.id,
                name: gamebyId.name,
                description: gamebyId.description,
                released: gamebyId.released,
                rating: gamebyId.rating ? gamebyId.rating : 0, 
                background_image: gamebyId.background_image ? gamebyId.background_image : "img not found",
                createdInDb: gamebyId.createdInDb,
                platforms: gamebyId.platforms.join(', '), 
                genres: gamebyId.genres.map(g => g.name).join(', ')
            };
        return res.status(201).send((finalGame) ? finalGame : `id inexistente`)
        }catch(e){res.status(404).send('error id creado')};
        } else {
        const idGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        if(idGame.data) {
            const gameFound = {
            id: idGame.data.id, 
            name: idGame.data.name, 
            description: idGame.data.description,
            background_image: idGame.data.background_image,
            background_image_additional: idGame.data.background_image_additional,
            released: idGame.data.released,
            rating: idGame.data.rating,
            platforms: idGame.data.platforms.map(p => p.platform.name).join(', '),
            genres: idGame.data.genres.map(g => g.name).join(', ')
        } 
        return res.status(201).send(gameFound)      
    }}} catch (error) {
        res.status(404).send('Error buscando videojuego by Id')
    }

})

module.exports = router;