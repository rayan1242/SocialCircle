import jwt from 'jsonwebtoken'
import Dotenv from 'dotenv'
Dotenv.config();
export const verifyToken = async (req,res,next) =>{
    try {
        let token = req.headers['authorization']; 
       console.log(token);
        if(!token){
            return res.status(500).json("Access denied");
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimStart();
        }

        const verified = jwt.verify(token,process.env.JWT_SECRET)

        req.user = verified;
        
        next();
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};