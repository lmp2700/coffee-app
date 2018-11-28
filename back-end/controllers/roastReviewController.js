const router = require('express').Router();
const RoastReview = require('../models/RoastReview');
const Roast = require('../models/Roast');
const requireLogin = require('../middleware/requireLogin');

router.post('/', requireLogin, async(req, res, next)=>{
    const reviewData = {
        ...req.body,
        reviewer: req.user._id
    }
    try{
        const roast = await Roast.findById(req.body.roast)
        const newReview = await RoastReview.create(reviewData);
        roast.reviews.push(newReview._id);
        await roast.save();
        req.user.roastReviews.push(newReview._id);
        await req.user.save();
        const result = await RoastReview.findById(newReview.id).populate('reviewer')
        res.json({
            status: 200,
            data: result
        })
    }catch(err){
        next(err);
    }
})

module.exports = router;