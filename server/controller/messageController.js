import User from '../models/User'
import Message from '../models/Message';
import cloudinary from '../lib/cloudinary';

export const getUserForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        //fetch all the users whos Id is not equal to userId
        const filteredUsers = await User.find({_id: {$ne: userId}}).select(
            "-password"
        );

        //Count number of messages not seen
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user) => {
            const message = await Message.find({senderId: user._id, 
                receiverId: userId, seen: false
            })
            if(message.length > 0){
                unseenMessages[user._id] = message.length;
            }
        })
        await Promise.all(promises);
        res.jason({success: true, users: filteredUsers, unseenMessages})
    } catch (error) {
        console.log(error.message);
        res.jason({process: false, message: error.Message})
    }
}

//Get all message for selected User
export const getMessages = async (req, res) => {
    try {
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or : [
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        })

        await Message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen: true});
        res.jason({success: true, messages});
    } catch (error) {
        console.log(error.message);
        res.jason({process: false, message: error.Message})
    }
}

//api to mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen: true});
        res.jason({success: true});
    } catch (error) {
        console.log(error.message);
        res.jason({process: false, message: error.Message})
    }
}


// api to send messages
export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const receiverId = req.params._id;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text, 
            image: imageUrl
        })

        res.jason({process: false, newMessage});
    } catch (error) {
        console.log(error.message);
        res.jason({process: false, message: error.Message})
    }
}