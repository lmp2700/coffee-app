const router = require('express').Router();
const User = require('../models/User');
const requireLogin = require('../middleware/requireLogin');
const FriendRequest = require('../models/FriendRequest');

router.get('/search', async (req, res)=>{
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

router.put('/:id', requireLogin, async(req, res, next)=>{
    try{
        const thisUser = await User.findByIdAndUpdate(req.params.id, {
            ...req.body,
            profile: {
                ...req.body,
                set: true
            }
        }, {new: true});
        console.log(thisUser);
        console.log(req.body);

        res.json({
            status: 200,
            data: thisUser
        })
    }catch(err){
        next(err);
    }
})

module.exports = router;