import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import {connectDB} from './lib/db.js'

//create Express app and HTTP server
const app = express();
const server = http.createServer(app);

//Middleware Setup
app.use(express.json({limit: '4mbnode server.js'}));
app.use(cors());

app.use("/api/status", (req, res) => res.send("server is Live"));

//connext to MONGODB
await connectDB();

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));