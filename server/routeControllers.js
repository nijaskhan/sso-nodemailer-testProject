const User = require("./models/userModel");
const crypto = require("crypto");
const nodemailer = require('./utils/nodemailer');
const Token = require("./models/tokenModel");

module.exports = {
    postlogin: async (req, res) => {
        try {
            const user = await User.findOne({
                email: req.body.email
            });
            if (user?.email === req.body.email && user?.password === req.body.password) {
                if (user?.verified === true) {
                    res.status(200).json({
                        success: true,
                        user: user,
                        verified: true,
                        message: 'login successful'
                    });
                } else if (user?.verified === false) {
                    const token = await Token.findOne({
                        userId: user._id
                    });
                    if (token) {
                        const url = `http://localhost:4000/api/${user._id}/verify/${token.token}`;
                        const mailSent = await nodemailer(user.email, "verification email", url);
                        if (mailSent)
                            return res.status(200).json({
                                success: true,
                                user: user,
                                message: 'email sent successfully',
                                verified: false
                            })
                        else throw new Error("email sent failed, try again after some time");
                    } else {
                        const token = new Token({
                            userId: user._id,
                            token: crypto.randomBytes(20).toString('hex')
                        });
                        await token.save();
                        const url = `http://localhost:4000/api/${user._id}/verify/${token.token}`;
                        const mailSent = await nodemailer(user.email, "verification email", url);
                        if (mailSent)
                            return res.status(200).json({
                                success: true,
                                user: user,
                                message: 'email sent successfully',
                                verified: false
                            })
                        else throw new Error("email sent failed, try again after some time");
                    }
                } else {
                    throw new Error("username or password does'nt match");
                }
            } else {
                throw new Error("username or password does'nt match");
            }
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: err.message
            });
        }
    },
    getUser: async(req, res) => {
        try {
            const { userId } = req.body;
            const user = await User.findById(userId);
            res.status(200).json({
                success: true,
                message: 'user data fetched successfully',
                user: user
            });
        } catch (err) {
            return res.status(200).json({
                success: false,
                message: err.message
            });
        }
    },
    verifyEmail: async (req, res) => {
        try {
            const token = await Token.findOne({
                userId: req.params.userId
            }).exec();
            if (req.params.token === token.token) {
                const updatedRes = await User.updateOne({
                    _id: req.params.userId
                }, {
                    verified: true
                });
                console.log("data updated");
                res.redirect(`http://localhost:3000/`);
            }
        } catch (err) {
            console.log(err.message);
            res.redirect(`http://localhost:3000/`);
        }
    },
    googleAuthLogin: async(req, res)=>{
        try{
            const userExist = await User.findOne({
                email: req.body.email
            });
            if(userExist){
                return res.status(200).json({
                    success: true,
                    message: `Logged in as ${userExist.name}`,
                    user: userExist
                });
            }else{
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    verified: true,
                    profilePic: req.body.picture
                });
                await newUser.save();
                return res.status(200).json({
                    success: true,
                    message: `Logged in as ${newUser.name}`,
                    user: newUser
                });
            }
        }catch(err){
            return res.status(401).json({
                success: false,
                message: err.message
            });
        }
    }
}