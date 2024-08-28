import User from "../models/User.js";
import Post from "../models/Post.js";

/*CREATE*/

export const cratePost = async (req,res) => {
    try {
       const  { userId, description, picturePath} = req.body;
       const user = await User.findById({_id:userId});

       const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
       })
       await newPost.save();

       const post = await Post.find().sort({createdAt: -1});
       res.status(201).json(post);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getFeedPosts = async(req,res) =>{
    try {        
    const posts = await Post.find().sort({createdAt:-1});
    res.status(201).json(posts);

    } catch (error) {
        res.status(500).json({message:error.message})
    }
} 

export const getSinglePost = async(req,res) =>{
    try {
        const {postId} = req.params;
        const post = await User.findById({_id:postId});
        res.status(201).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
   
    }
}