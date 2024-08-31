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
        console.log(postId)
        const post = await Post.findById({_id:postId});
        console.log(post)
        res.status(201).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
   
    }
}

export const getUserPosts = async(req,res) =>{
    try {
        const {user_id} = req.params;
        const userPosts = await Post.find({user_id}).sort({createdAt:-1});
        res.status(201).json(userPosts);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const likePosts = async(req,res) =>{
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = await post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete({ _id: id });
        
        const post = await Post.find().sort({ createdAt: -1 });
        res.status(201).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }

}
