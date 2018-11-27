const router = require('express').Router();
const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');
//LOGGING IN WAS REQUIRED BEFORE THIS CONTROLLER
//THEREFORE ALL ROUTES ALREADY HAVE A LOGGED IN USER
router.get('/', async (req, res, next) => {
    try{
        const friendRequestsForYou = await FriendRequest.find({requested: req.user._id, accepted: false, declined: false}).populate('requester');
        const friendRequestsYouHaveMade = await FriendRequest.find({requester: req.user._id, accepted: false, declined: false});
        res.json({
            status: 200,
            data: {
                friendRequestsForYou: friendRequestsForYou,
                friendRequestsYouHaveMade: friendRequestsYouHaveMade
            }
        })
    }catch(err){
        next(err);
    }
})

router.post('/', async (req, res, next) => {
    try{
        const newFriendRequest = await FriendRequest.findOrCreate({
            requester: req.user._id,
            requested: req.body.requestedFriendId
        })
        if(newFriendRequest.created){
            const newRequest = await FriendRequest.findById(newFriendRequest.doc._id).populate({"path":"requester","select":"-password"}).populate({"path":"requested","select":"-password"})
            res.json({
                status:200,
                data: newRequest
            })
        }else{
            res.json({
                status: 400 //bad request, duplicates
            })
        }

    } catch(err){
        next(err);
    }
})

router.put('/:id/accept', async (req, res, next) => {
    try{
        const thisFriendRequest = await FriendRequest.findById(req.params.id).populate('requester');
        if(thisFriendRequest.requested.toString() !== req.user._id.toString()){
            throw new Error("Unauthorized attempt to modify friend request");
        }
        thisFriendRequest.accepted = true;
        await thisFriendRequest.save();
        req.user.friends.addToSet(thisFriendRequest.requester._id);
        await req.user.save();
        const otherUser = await User.findById(thisFriendRequest.requester._id);
        otherUser.friends.addToSet(req.user._id);
        await otherUser.save()
        res.json({
            status: 200,
            data: thisFriendRequest
        })
    }catch(err){
        next(err);
    }
})

router.put('/:id/decline', async (req, res, next) => {
    try{
        const thisFriendRequest = await FriendRequest.findById(req.params.id).populate('requester');
        if(thisFriendRequest.requested.toString() !== req.user._id.toString()){
            throw new Error("Unauthorized attempt to modify friend request");
        }
        thisFriendRequest.declined = true;
        await thisFriendRequest.save();
        res.json({
            status: 200,
            data: thisFriendRequest
        })
    }catch(err){
        next(err);
    }
})

module.exports = router;