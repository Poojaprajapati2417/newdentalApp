import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
    path:"./env"
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8001,()=>{
        console.log(`Server is running on port: ${process.env.PORT}`);
    });


    
    
})
.catch((error)=>{
    console.log("MONGODB DB CONNECTION FAILED",error);

})



