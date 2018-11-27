const router = require('express').Router();
const Roast = require('../models/Roast');

router.get('/', async(req, res, next)=>{
    try{
        const roasts = await Roast.find().populate('roaster');
        res.json({
            status: 200,
            data: roasts
        })
    }catch(err){
        next(err);
    }
})

router.get('/search', async(req, res, next) => {
    try{
        const roasts = await Roast.find({name: new RegExp(req.query, 'i')});
        res.json({
            status: 200, 
            data: roasts
        })
    }catch(err){
        next(err);
    }
})

router.get('/:id', async(req, res, next)=>{
    try{
        const roast = await Roast.findById(req.params.id)
        .populate('roaster')
        .populate({
            path: 'reviews',
            populate: {
                path: 'reviewer'
            }
        });
        res.json({
            status: 200, 
            data: roast
        })
    }catch(err){
        next(err);
    }
})

router.post('/', async(req, res, next)=>{
    console.log(req.body);
    try{
        const newRoast = await Roast.create(req.body);
        res.json({
            status: 200,
            data: newRoast
        })
    }catch(err){
        next(err);
    }
})


module.exports = router;