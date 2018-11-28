const router = require('express').Router();
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_API_KEY
});
const Roaster = require('../models/Roaster');
const Roast = require('../models/Roast');
const MapsQuery = require('../models/MapsQuery');

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
        console.log("SEARCHING WITH " + JSON.stringify(req.query));
        if(!req.query.location){
            console.log("LOCATOINLESS SEARCH");
        }
        const existingSearch = await MapsQuery.find({
            query: req.query.query || " ",
            location: req.query.location
        })
        if(existingSearch.length === 0){
            await MapsQuery.create({query: req.query.query, location: req.query.location})
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
                            const creationPromises = response.json.results.map(async (result)=>{
                                console.log(result.photos);
                                const thisRoaster = {
                                    name: result.name,
                                    address: result.formatted_address,
                                    googleId: result.id,
                                }
                                const roaster = await Roaster.findOrCreate(thisRoaster, {
                                    ...thisRoaster,
                                    keywords: [req.query.query]
                                });
                                roaster.doc.keywords.addToSet(req.query.query);
                                await roaster.doc.save();
                                return roaster.doc
                            })
                            Promise.all(creationPromises).then((roasters)=>{
                                res.json({
                                    status: 200,
                                    data: roasters
                                })
                            })
                        }
                    })
                }
            
            })
        }else{
            const roasters = await Roaster.find({
                $or: [{keywords: new RegExp(req.query.query, 'i')},
                    {name: new RegExp(req.query.query, 'i')}
                ]
            })
            console.log("FINDING CACHED ROASTERS");
            console.log(roasters);
            res.json({
                status: 200,
                data: roasters
            })
        }
    }catch(err){
        next(err);
    }
})

router.get('/:id', async(req, res, next)=>{
    try{
        const roaster = await Roaster.findById(req.params.id);
        const roasts = await Roast.find({roaster: req.params.id})
        res.json({
            status: 200, 
            data: {
                ...roaster._doc,
                roasts: roasts
            }
        })
    }catch(err){
        next(err);
    }
})

module.exports = router