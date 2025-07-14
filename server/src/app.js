import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser"
const app=express();



app.use(cors({
    origin:'http://localhost:8000',
    
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));





app.use(cookieparser());

import userroutes from "./routes/userroutes.js"
import doctorrouter from "./routes/Doctorroute.js";
import { clinicrouter } from "./routes/clinicroutes.js";

app.use("/Dental/user",userroutes);
// http://localhost:8000/Dental/user/createuser

app.use("/Dental/doctor",doctorrouter)
// http://localhost:8000/Dental/doctor/add-doctor 


app.use("/Dental/clinic",clinicrouter)
// http://localhost:8000/Dental/clinic/addclinic

export {app}