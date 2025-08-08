{/*User Authentication and creation*/} 
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utils.js';
 
 export const signup = async(req, res) => {
    const {email, password, fullName, bio} = req.body;

    try {
        {/*misssing data*/}
        if(!fullName || !email || !password || !bio){
            return res.json({success: false, message: "missing details"})
        }

        {/*User Already exist*/}
        const user = await User.findOne({email})
        if(user){
            return res.jason({success: false, message: "User already present with given Email"})
        }

        {/*pasword ecryption and create newUser*/}
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email, fullName, password: hashedPassword, bio
        });
        
        token = generateToken(newUser._id);
        res.json({success: true, userData: newUser, token, message: "Account created Successfully!!"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
 }


 {/* Login logic*/}
 export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.json({success: false, message: "Invalid Password"});
        }

        const token = generateToken(user._id);
        res.json({success: true, user, token, message: "Login Successful"})
    } catch (error) {
        console.log(error.message);
        res.jason({success: false, message: error.message})
        
    }
 }

//controller to check if User is Authenticated 
export const checkAuth = (req, res) => {
    res.json({success: true, user: req.user});
}