import Comment from "../models/Comment";
import User from "../models/User";

export const createComment = async (req,res) => {
   try {
    console.log("controller");
    const {postId,userId,description} = req.body;
    const user = await User.findById(userId);
    const newComment = new Comment(
        {
        postId,
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        userPicturePath: user.picturePath,
        likes: {},
        }
    )
    await newComment.save();

    
    const comment = await Comment.find();
    res.status(201).json(comment);
   } catch (error) {
    console.log("Error creating Comment!");
        console.log(err);
        res.status(409).json({ message: err.message });
   }

}

export const getPostComments = async(req,res)=>{
    const {postId} = req.params;
    try {
        const comments = await Comment.find({postId:postId});
        res.status(201).json(comments);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


