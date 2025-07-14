import express from "express"
import { emailverifycontroller, loginuser, userregister} from "../controllers/usercontroler.js";
import { upload } from "../middlewares/multer.js";
const router=express.Router();


router.post("/createuser",upload.fields([{name:"profileimg" , maxCount:1}]),  userregister);
router.get("/verifyuser/:id" ,emailverifycontroller)
router.post("/loginuser" ,loginuser)


export default router;