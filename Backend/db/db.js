import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config({
    path:'C:/Users/Rayyan/developer/SocialCircle/.env'
});
  
const URL = process.env.mongo_db_url;
const connect = async () =>{
                        await mongoose
                        .connect(URL)
                        .then(()=>{
                            console.log("connected to mongodb");
                        })
                        .catch((error) =>{
                            console.log(error);
                        });

}
export default connect