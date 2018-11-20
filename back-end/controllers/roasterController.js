const router = require('express').Router();
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_API_KEY
});
const Roaster = require('../models/Roaster');

router.get('/', async(req, res, next)=>{
    try{
        const roasters = await Roaster.find();
        res.json({
            status: 200,
            data: roasters
        })
    }catch(err){
        next(err);
    }
})

router.get('/search', async(req, res, next) => {
    try{
        if(!req.query.location){
            console.log("LOCATOINLESS SEARCH");
        }
        googleMapsClient.geocode({
            address: req.query.location
        }, (err, response)=>{
            if(err){
                next(err)
            }else{
                googleMapsClient.places({
                    query: req.query.query + "coffee roaster",
                    location: response.json.results[0].geometry.location
                }, (err, response) => {
                    if(err){
                        next(err);
                    }else{
                        const creationPromises = response.json.results.map((result)=>{
                            console.log(result);
                            const thisRoaster = {
                                name: result.name,
                                address: result.formatted_address,
                                googleId: result.id
                            }
                            return Roaster.findOrCreate(thisRoaster);
                        })
                        Promise.all(creationPromises).then((roasters)=>{
                            console.log(roasters)
                            res.json({
                                status: 200,
                                data: roasters
                            })
                        })
                    }
                })
            }
        })
    }catch(err){
        next(err);
    }
})

module.exports = router