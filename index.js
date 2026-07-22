// IMPORT PAKAGE 
import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cors from "cors";
import cluster from 'cluster'




// USE PAKAGE AND APP
const app = express();
app.use(bodyParser.json());
app.use(cors());



// CONFIGURE EXTRANNEL PAKAGE
dotenv.config();


// IMPORT OTHER JS FILE 
import HandleFacebookTriger from './router/fbwebhook.router.js'

import { ConnectDatabase } from "./utils/MongoDb.database.js";

// HANDLE FACEBOOK TRIGER
app.use('/webhook', HandleFacebookTriger)




// HANDLE SERVER RUN STATUS
app.get('/', (req,res)=>{
    console.log('SERVER IS RUNNING USER HIT ROOT "/" ')
    res.status(200).send(' SERVER IS WORKING AND USER HIT ROOT "/"')
})


app.get('/database', async (req, res) => {
  const connectdab = await ConnectDatabase();
  res.send(connectdab);
});


// CONNECT DATABASE
 await ConnectDatabase()
 
// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
