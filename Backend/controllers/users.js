import User from "../models/User.js";


export const getUser = async (req,res) => {
    try {
        const {id}= req.params;
        const user = await User.findById(id);
        const formattedUser = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            occupation: user.occupation,
            location: user.location,
            picturePath: user.picturePath,
        }; 
        res.status(200).json(formattedUser); 
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
};

export const getAllSearchUsers = async(req,res) =>{
    try {
        const { searchQuery} = req.params;
        const users = await User.find({
            firstName : {$regex : new RegExp(searchQuery,i)}
        }).select(-password);

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }

} 

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;  // Assuming id is the MongoDB ObjectId
        const user = await User.findOne({ _id:id });  // Await the findOne query

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch friends' details based on friends' ids stored in the user document
        const friends = await Promise.all(
            user.friends.map(friendId => User.findOne({ _id: friendId }))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => ({
                _id, firstName, lastName, occupation, location, picturePath
            })
        );

        res.status(200).json(formattedFriends);

    } catch (error) {
        res.status(500).json({ message: error.message });  // Return 500 for server errors
    }
};

export const addRemoveFriend = async (req,res) =>{
    try {
        const {id, friendId} = req.params;
        console.log(id,friendId);
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=>{ id!==friendId});
            friend.friends = friend.friends.filter((id)=>{ id!==id});
        }else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
    
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath }) => {
                return { _id,firstName,lastName,occupation,location,picturePath };
            }
        )
        res.status(200).json(formattedFriends);

    } catch (error) {
        res.status(404).json({message:error.message});
        
    }

}