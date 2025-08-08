import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        mongoose.connection.on('connnect', () => console.log('Database Connectd'));
        mongoose.connect(`${process.env.MONGODB_URL}/Easy-Chat`).then((res)=>{console.log("connected to db");
        }).catch((err)=>{console.log(err);
        });
        
    } catch (error) {
        console.log(error);
    }
}