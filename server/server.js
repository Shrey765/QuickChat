import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import {connectDB} from './lib/db.js'
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';

//create Express app and HTTP server
const app = express();
const server = http.createServer(app);

//Middleware Setup
app.use(express.json({limit: '4mbnode server.js'}));
app.use(cors());

//route Setup
app.use("/api/status", (req, res) => res.send("server is Live"));
app.use('/api/auth', userRouter);
app.use("api/messages", messageRouter);

//connext to MONGODB
await connectDB();

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));