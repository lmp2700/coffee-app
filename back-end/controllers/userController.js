const router = require('express').Router();
const User = require('../models/user');
const requireLogin = require('../middleware/requireLogin');
const FriendRequest = require('../models/friendRequest');

router.get('/', async (req, res)=>{
    query = req.query.query || "";
    try{
        const users = await User.find({_id: { $ne: req.user._id },
            username: new RegExp(query, 'i'),
        });
        res.json({
            status: 200,
            data: users
        })
    }catch(err){
        next(err);
    }


})
router.post('/:id/request-friend', async(req, res, next)=>{
    try{
        const newFriendRequest = await FriendRequest.findOrCreate({
            requester: req.user._id,
            requested: req.params.id
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
router.post('/:id/add-friend', async (req, res, next)=>{
    try {
        if(req.params.id !== req.user.id){
            const user = await User.findById(req.params.id).select('-password');
            req.user.friends.addToSet(user.id);
            await req.user.save();
            user.friends.addToSet(req.user.id);
            await user.save();
            const obsoleteRequest = await FriendRequest.findOne({"requester":req.params.id, "requested":req.user._id})
            obsoleteRequest.accepted = true;
            await obsoleteRequest.save()
            res.json({
                status: 200,
                data: {
                    user: user
                }
            })
        }
    } catch (err) {
        next(err);
    }
})
router.get('/friend-requests', async (req, res, next)=>{
    try{
        const friendRequests = await FriendRequest.find({$or:[
            {"requested": req.user._id,"accepted":false},
            {"requester": req.user._id,"accepted": false}]})
        .populate({"path": "requester","select":"-password"})
        .populate({"path": "requested","select":"-password"})
        res.json({
            status: 200,
            data: friendRequests
        })
    } catch(err){
        next(err);
    }
})

module.exports = router;