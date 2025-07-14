import { Usermodel } from "../models/Usermodel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import sendemail from "../utils/sendmail.js";
import jwt from "jsonwebtoken";
import validator from "validator"





const generateAccessTokenandRefreshtoken = async (userID) => {

    try {

        const user = await Usermodel.findById(userID)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });


        return { accessToken, refreshToken }





    } catch (error) {
        res.status(500).send(
            {
                message: `Something wents wrong to generate token ${error}`,
                status: "notsuccess"
            }
        )

    }




}








const userregister = async (req, res) => {

    try {

        // take all data from frontend

        const { email, password, usertype, mobileNo } = req.body;


        // check weather a field is empty or not

        if ([email, password, usertype, mobileNo].some((field) =>
            field?.trim() === "")) {
            return res.status(200).send(
                {
                    message: "All fields are required",
                    status: "notsuccess"

                }
            )
        }
        // if (!validator.isEmail(email)) {
        //     return res.status(200).send({
        //         Status: "notsuccess",
        //         message: "Email is not valid"
        //     })


        // }
        if (!validator.isStrongPassword(password)) {
            return res.status(200).send({
                Status: "notsucess",
                message: "Enter a strong password (min 8 chars, with numbers, symbols, uppercase & lowercase)"
            })
        }
        // check weather user is exist ornot

        const existinguser = await Usermodel.findOne({ email });
        if (existinguser) {
            return res.status(200).send(
                {
                    message: "User already exists",
                    status: "notsuccess"

                }
            )
        }




        const user = await Usermodel.create({
            email,
            password,
            usertype,
            mobileNo
        })








        // const createduser = await Usermodel.findById(user._id).select(
        //     "-password"
        // )






        // if (!createduser) {
        //     return res.status(200).send(
        //         {
        //             message: "Something went wrong to create user",
        //             status: "notsuccess"

        //         }
        //     )
        // }

        // sendemail(user.username ,"verify email" ,url)
        return res.status(200).send({
            message: "User register successfully",
            data: user,
            status: "success"

        })

    } catch (error) {
        res.status(500).send({
            message: `Register controller ${error.message} `,
            status: "notsuccess",

        })

    }












}






const emailverifycontroller = async (req, res) => {
    try {

        const user = await Usermodel.findById({ _id: req.params.id })
        if (!user) {
            res.status(200).send({
                message: "USER NOT FOUND INVALID LINK",
                status: "notsuccess"

            })
        }

        await Usermodel.updateOne({ _id: user._id, verified: true });
        res.status(200).send({
            message: "Email verify successfully",
            status: "success"
        })

    } catch (error) {
        res.status(500).send({
            message: `Something went wrong to verify user ${error.message}`
        })

    }
}



const loginuser = async (req, res) => {

    try {

        const { email, password, usertype } = req.body;
        if (!email || !password || !usertype) {
            return res.status(200).send({
                message: "All fields are required",
                status: "notsuccess"


            })

        }
        // find user using username
        const user = await Usermodel.findOne({ email })


        // find user by username or email

        // const user= await Usermodel.findOne({
        //     $or:["username","email"]
        // })

        if (!user) {
            return res.status(200).send({
                message: "user not found",
                status: "notsuccess"


            })

        }


        const ispasswordvalid = await user.isPasswordcorrect(password)

        if (!ispasswordvalid) {
            return res.status(200).send(
                {
                    message: "Invalid username or password",
                    status: "notsuccess",

                }
            )
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2d" })

        //  const {accessToken,refreshToken}= await generateAccessTokenandRefreshtoken(user._id);



        res.status(200).send(
            {
                message: "User login successfully",
                status: "success",
                user: user,
                token: accessToken

            }
        )









    } catch (error) {
        res.status(500).send({
            message: `Something went wrong to login ${error}`,
            status: "notsuccess",
            "error": error.message
        })

    }









    //  try {

    //     const {username , password ,usertype}=req.body;



    //     if(!username) return res.status(200).send(
    //         {
    //             message:"Username is required ",
    //             status:"notsuccess"
    //         }
    //     )

    //     const user=await Usermodel.findOne({username});

    //     if(!user) return res.status(200).send(
    //         {
    //             message:"User not found",
    //             status:"notsuccess"
    //         }
    //     )


    //     const ispasswordvalid=await user.isPasswordcorrect(password);


    //     if(!ispasswordvalid){
    //         return res.status(200).send(
    //             {
    //                 message:"Invalid username or password",
    //                 status:"notsuccess"
    //             }
    //         )
    //     }

    //     const token=jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"2d"})


    //     res.status(200).send(
    //         {
    //             message:"User login successfully",
    //             status:"success",
    //             token:token

    //         }
    //     )



    //  } catch (error) {
    //     res.status(500).send(
    //         {
    //             message:`User login controller error: ${error.message}`,
    //             status:"notsuccess"
    //         }
    //     )


    //  }


}






export { userregister, emailverifycontroller, loginuser }