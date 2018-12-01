const router = require('express').Router();
const RoasterReview = require('../models/RoasterReview');
const Roaster = require('../models/Roaster');
const requireLogin = require('../middleware/requireLogin');

router.post('/', requireLogin, async(req, res, next)=>{
    console.log(req.body)
    const reviewData = {
        ...req.body,
        reviewer: req.user._id
    }
    try{
        const roaster = await Roaster.findById(req.body.roaster)
        const newReview = await RoasterReview.create(reviewData);
        roaster.reviews.push(newReview._id);
        await roaster.save();
        req.user.roasterReviews.push(newReview._id);
        await req.user.save();
        console.log("GOT HERE")
        console.log(newReview)
        const result = await RoasterReview.findById(newReview._id).populate('reviewer')
        res.json({
            status: 200,
            data: result
        })
    }catch(err){
        next(err);
    }
})

module.exports = router;