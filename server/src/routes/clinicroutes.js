import express from "express";
import { addClinic, getprofileByEmail,updatelogo,getclinicByid,updateClinicProfile } from "../controllers/cliniccpntroller.js";
import { upload } from "../middlewares/multer.js";


const clinicrouter=express.Router()
clinicrouter.post("/addclinic",upload.fields([{name:"clinicimages",maxCount:5},{name:"logo",maxCount:1}]),addClinic)
clinicrouter.post("/getclinicprofile",getprofileByEmail)
clinicrouter.post("/logo",upload.fields([{name:"logo",maxCount:1}]),updatelogo)
clinicrouter.get (`/getdata/:clinicid`,getclinicByid)
clinicrouter.post("/updateClinicProfile",updateClinicProfile)
export {clinicrouter}