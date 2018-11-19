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

router.put('/:id', async (req, res, next) => {
    try{
        const thisFriendRequest = await FriendRequest.findById(req.params.id);
        if(this.FriendRequest.requested !== req.user._id){
            throw new Error("Unauthorized attempt to modify friend request");
        }
        if(req.body.accepted){
            thisFriendRequest.accepted = true;
            await thisFriendRequest.save();
        }else if(req.body.declined){
            this.FriendRequest.declined = true;
            await thisFriendRequest.save();
        }
    }catch(err){
        next(err);
    }
})

module.exports = router;