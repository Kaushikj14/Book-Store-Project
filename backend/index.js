import express from "express";
import { PORT,MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling cors policy
// Option 1:- Allow all origins with default cors(*)
app.use(cors());
// option 2:- Allow custom origins
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],
// }))

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send('Welcome')
});

app.use('/books',booksRoute);

mongoose.connect(MONGODB_URL)
        .then(
            ()=>{
                console.log('App connected to database');
                app.listen(PORT,()=>{
                    console.log(`App is lsitening to port:${PORT}`);
                });
                
            }
        )
        .catch((error)=>{
                console.log(error);
        });