
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'

dotenv.config({
    path:'./env'
})


// The remainder of the code sets up an Express server. It listens for any errors that occur in the app and logs them. It also starts the server and logs the port on which it is running.
connectDB()
.then(()=>{
    app.on("error",(error)=>{ 
            // if any error occured in app means express server connection
            console.log("Error ",error);
            throw error
        })
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at port :${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log('MONGO db connection failed !!',err);
})


