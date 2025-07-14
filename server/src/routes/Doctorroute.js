import express from "express"
import { addDoctor,viewprofileByEmail,updateDoctorProfile,getdoctorbyid,updateprofileimg} from "../controllers/doctorcontroller.js";
import { upload } from "../middlewares/multer.js";
const doctorrouter=express.Router();




doctorrouter.post("/add-doctor",upload.fields([{name:"doctorimg",maxCount:1},{name:"licenseimg",maxCount:1}]), addDoctor)
doctorrouter.post("/getdoctprofile",viewprofileByEmail)
doctorrouter.post("/updateDoctorProfile",updateDoctorProfile)
doctorrouter.get("/getdata/:doctorID",getdoctorbyid)
doctorrouter.post("/updateprofileimg",upload.fields([{name:"doctorimg",maxCount:1}]),updateprofileimg)
export default doctorrouter;