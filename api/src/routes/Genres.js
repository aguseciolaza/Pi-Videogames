const {Router} = require('express');
const router = Router();
const axios = require('axios');
const {Genre} =require('../db');
const {API_KEY} = process.env;

const infoApi = async () => {
    const apiData = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = apiData.data.results
    genres.forEach(async (g) => {
           await Genre.findOrCreate({where:{id: g.id,name: g.name}})
    });
}


router.get('/', async(req,res) => {
    try{
        let checkDB = await Genre.findAll();
        if (!checkDB.length) {
            const genres = await infoApi();
            return res.status(200).send(genres);
        } else {
            console.log('okey 2');
            return res.status(200).send(checkDB)}
    }catch(e){
    return res.status(404).send('algo salio mal con el get genres')}
});



module.exports = router;