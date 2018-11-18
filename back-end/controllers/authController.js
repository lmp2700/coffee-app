const express = require("express");
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
// const nodemailer = require('nodemailer');
const csrf = require('csurf');
const csrfProtection = csrf();

// const smtpConfig = {
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, // upgrade later with STARTTLS
//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD
//     }
// };
// router.get('/get-csrf-token', csrfProtection, (req, res)=>{
//     console.log("REQUEST INITIATE")
//     const token = req.csrfToken();
//     console.log("THIS IS TOKEN")
//     console.log(token);
//     res.json({
//         status: 200,
//         data: {
//             token: token
//         }
//     })
// })
router.post('/logout', (req, res)=>{
    req.logout();
    res.json({
        status: 200,
        data: {
            accepted: "true"
        }
    })
})
router.post('/register', (req, res, next)=>{
    User.create(req.body, (err, user)=>{
        if(err){
            next(err)
        } else {
            // sendVerificationEmail(user);
            req.logIn(user, function(err){
                if(err){
                    return next(err);
                }
                return res.json({
                    "status": 200,
                    "data": {
                        user: req.user
                    }
                })
            })
        }
    })
})
router.post('/login', (req, res, next)=>{
    passport.authenticate('local', function(err, user, info){
        if(err){
            return next(err);
        }
        if(!user){ //user is set to false on auth failures
            console.log(info);
            console.log("PROBLEM WITH LOGIN");
            return res.json({
                "status": 400,
                "data": {
                    valid: false
                }
            })
        }
        req.logIn(user, function(err){
            if(err){
                return next(err);
            }
            return res.json({
                "status": 200,
                "data": {
                    valid: true,
                    user: req.user
                }
            })
        })
    })(req, res, next)
})


router.post('/google', passport.authenticate('google-token'))

router.post('/forgot-password', async (req, res, next)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        if(!user){
            next(new Error("That's not a valid email for a user"));
            return;
        }
        const payload = {
            id: user._id,
            email: user.email
        }
        const secret = user.password.toString() + user.createdAt.toString();
        const token = jwt.encode(payload, secret);
        const transporter = nodemailer.createTransport(smtpConfig);
        const message = {
            from: process.env.EMAIL_USERNAME,
            to: req.body.email,
            subject: 'Reset your password',
            text: 'Plaintext version of the message',
            html: '<p>Hey buddy, here\'s a link to reset your password</p>'+
                  `<a href="http://localhost:3000/auth/reset-password/${user._id}/${token}">Reset password</a>`
        };
        transporter.sendMail(message)
        console.log('sent email!')
        // verify connection configuration
        transporter.verify(function(error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        });
        res.redirect('/auth/forgot-password-sent')
    } catch(err) {
        next(err);
    }
})

router.get('/reset-password/:id/:token', async (req, res, next)=>{
    try{
        const user = await User.findById(req.params.id);
        const info = jwt.decode(req.params.token, user.password.toString() + user.createdAt.toString())
        console.log(info);
        res.render("reset_password.ejs");
    } catch(err) {
        next(err);
    }
})

router.get('/verify-account/:userId/:token', async (req, res, next)=>{
    console.log("VERIFYING ACCOUNT PAGE REQUESTED")
    try {
        const user = await User.findById(req.params.userId);
        const tokenData = jwt.decode(req.params.token, user.password.toString() + user.createdAt.toString())
        console.log(tokenData);
        if(tokenData.email !== user.email){
            return next(new Error("Invalid link"));
        }
        user.verified = true;
        await user.save()
        res.render('verify_email.ejs');
    } catch(err){
        next(err);
    }
})

router.get('/is-logged-in', async(req, res)=>{
    if(req.user){
        return res.json({
            status: 200,
            data: {
                "loggedIn": true,
                "user": req.user,
            }
        })
    } else {
        res.json({
            status: 200,
            data: {
                "loggedIn": false,
            }
        })
    }
})

function sendVerificationEmail(user){
    const payload = {
        id: user._id,
        email: user.email
    }
    const secret = user.password.toString() + user.createdAt.toString();
    const token = jwt.encode(payload, secret);
    const transporter = nodemailer.createTransport(smtpConfig);
    const message = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: 'Verify Your Account with Bean Scout',
        text: 'Please verify your account',
        html: '<p>Hey buddy, here\'s a link to verify your account</p>'+
              `<a href="http://localhost:3000/auth/verify-account/${user._id}/${token}">Reset password</a>`
    };
    transporter.sendMail(message)
}
module.exports = router;