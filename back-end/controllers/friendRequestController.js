const router = require('express').Router();
const FriendRequest = require('../models/FriendRequest');

router.get('/', async (req, res, next) => {
    try{
        const friendRequestsForYou = await FriendRequest.find({requested: req.user._id});
        const friendRequestsYouMade = await FriendRequest.find({requester: req.user._id});
    }catch(err){
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    try{
        console.log(req.body);
        const newRequest = {
            requester: req.user._id,
            requested: req.body.potentialFriendId
        }
        console.log(newRequest);
    }catch(err){
        next(err)
    }
})

module.exports = router;