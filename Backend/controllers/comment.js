import Comment from "../models/Comment";
import User from "../models/User";
import Post from "../models/Post";
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

export const likeComment = async(req,res) =>{
    try {
        const {postId} = req.params;
    const {userId} = req.body;
    const post = await Post.findById(postId);
    const isLiked = await post.likes.findById(userId);
    
    if(isLiked){
        post.likes.delete(userId);
    }else{
        post.likes.set(userId,true);
    }
    const UpdatedPost = await Comment.findByIdAndUpdate(
        id,
        { likes:post.likes },
        {new : true}
    );
    res.status(200).json(UpdatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

 
export const updateComment = async (req, res) => {
    let { _id } = req.body;

    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            { _id: _id },
            req.body
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
