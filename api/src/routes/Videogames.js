const {Router} = require('express');
const router = Router();
const axios = require('axios');
const {Videogame, Genre} =require('../db');
// const Genre = require('../models/Genre');
const {API_KEY} = process.env;
const {Op} = require('sequelize');

const getInfoApi = async () => {
    const api1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=40`);
    const api2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2&page_size=40`);
    const api3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3&page_size=20`);
    let apis = api1.data.results.concat(api2.data.results).concat(api3.data.results); 
    let apisMap = apis.map(game => {
        return {
            id: game.id,
            name: game.name,
            released: game.released,
            rating: game.rating ? game.rating : 0, 
            parent_platforms: game.platforms.map(p => p.platform.name).join(', '),
            genres: game.genres.map(g => g.name).join(', ')
        }
    });
    return apisMap;
    }

const getInfoDB = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

const mergeinfo = async () => {
    var apiGames = await getInfoApi();
    var dbGames = await getInfoDB();
    var totalGames = apiGames.concat(dbGames);
    return totalGames;
}

const nameQuery = async (name) => {
    const nameApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page_size=15`)
    const arrayName = nameApi.data.results.map(game => {
        return {
            id: game.id,
            name: game.name,
            released: game.released,
            rating: game.rating ? game.rating : 0, 
            parent_platforms: game.platforms.map(p => p.platform.name).join(', '),
            genres: game.genres.map(g => g.name).join(', ')
        }
    })
    const nameDb = Videogame.findAll({where: {name: {[Op.iLike]: name}}});
    if (arrayName.length) { return arrayName} else { return nameDb}
}

router.get('/', async (req, res) => {
    const {name} = req.query ; 
    if (name) {
        try{
        const searchName = await nameQuery(name) ;
        if (searchName.length) { 
            res.status(201).send(searchName)
        } else { res.send(`No existe ningun juego de nombre ${name}`)}
    }catch(e) {res.send('Error con el query name')}
    } else {
        try{
        const renderGames = await mergeinfo();
        res.status(201).send(renderGames)
        }catch(e){res.send('Error en el merge info')}
    }
})

router.post('/', async (req,res) => {
    const {name, description, released, rating, parent_platforms, genres} =req.body; 
    if (!name || !description || !parent_platforms || !genres) {
        res.status(404).send('Faltan datos para crear el juego')
    } else {
        try {
            const newGame = await Videogame.create({
            name, 
            description, 
            released, 
            rating, 
            parent_platforms
        }) 
        res.status(201).send('Juego creado')
        let genresDB = await Genre.findAll({where: {name: genres}}) ;
        console.log(genresDB)
        await newGame.addGenre(genresDB)
        } catch (error) {
            res.send('Algo salio mal en la creacion del juego')
        }

    }
})

module.exports = router;