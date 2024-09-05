import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
export const createComment = async (req,res) => {
   try {
    console.log("controller");
    const {postId,userId,description} = req.body;
    const user = await User.findById(userId);
    console.log(userId,postId,description);
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
        console.log(error);
        res.status(409).json({ message: error.message });
   }

}


export const getPostComments = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ postId: postId });
        res.status(200).json(comments);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const likeComment = async(req,res) =>{
    try {
    const {postId} = req.params;
    const {userId} = req.body;
    console.log(postId,userId);
    const comment = await Comment.findById(postId);
    let isLiked = false;
    if (!comment) {
        throw new Error('Post not found');
      }
    isLiked = await comment.likes.get(userId);
    console.log(isLiked);
    if(isLiked){
        comment.likes.delete(userId);
    }else{
        comment.likes.set(userId,true);
    }
    const UpdatedPost = await Comment.findByIdAndUpdate(
        comment._id,
        { likes:comment.likes },
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

/* DELETE COMMENT */
export const deleteComment = async (req, res) => {
    let { _id } = req.body;

    try {
        await Comment.findByIdAndDelete(
            { _id: _id }
        );
        res.status(200).json({message: "Comment Deleted..."});
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};