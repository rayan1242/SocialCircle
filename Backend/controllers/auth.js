import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
export const register = 
    async (req,res) => {
        try {
            const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        console.log("Password:", password);
        const salt = await bcrypt.genSalt();
        //console.log(salt);
        const passwordHash = await bcrypt.hash(password,salt);
        console.log(passwordHash);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        } catch(err){
            console.log(`registration failed ${err}`);
            res.status(500).json({error:err.message});
        }
    };

export const login = 
    async (req,res) => {
      try { 
         const {email,password} = req.body
        const user  = await User.findOne({email:email});
        if(!user){
            return res.status(400).json({ msg: "User does not exist. " });
        }

        const isMatch = bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({ msg: "Invalid credentials. " });
        }
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{ expiresIn: '1h' });
        delete user.password;
        res.status(200).json({token,user});
    } catch(err){
        res.status(500).json({error:err.message});
    }
}
