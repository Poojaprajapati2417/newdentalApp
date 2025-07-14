import { Doctormodel } from "../models/Doctormodel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addDoctor = async (req, res) => {

    try {

        // take all data from frontend

        const { username, DOB, biography, doctorage, gender, email, mobileno, degree, doctorimg, specialization, licenseNo, licenseimg, address } = req.body;


        // check weather a field is empty or not

        if ([username, email, DOB, biography, mobileno, address, degree, specialization, licenseNo,].some((field) =>
            field?.trim() === "")) {
            return res.status(200).send(
                {
                    message: "All fields are required",
                    status: "notsuccess"

                }
            )
        }


        // check weather doctor profile is exist or not

        const existingdoctor = await Doctormodel.findOne({ email });
        if (existingdoctor) {
            return res.status(200).send(
                {
                    message: "Profile already created",
                    status: "notsuccess"

                }
            )
        }
        // doctor image path url created from cloudinary

        if (!req.files || !req.files.doctorimg || !req.files.doctorimg[0]) {
            return res.status(200).send({
                message: "Profile image is compulsory",
                status: "notsuccess"
            });
        }

        const doctorimgpath = req.files?.doctorimg[0]?.path;
        console.log(req.files)

        // if(!doctorimgpath){
        //     return res.status(200).send(
        //         {
        //             message:"Doctor image is complusory",
        //             status:"notsuccess"
        //         }
        //     )
        // }


        const doctorimage = await uploadOnCloudinary(doctorimgpath)



        // license image path url created from cloudinary
        if (!req.files.licenseimg || !req.files.licenseimg[0]) {
            return res.status(200).send({
                message: "License image is compulsory",
                status: "notsuccess"
            });
        }

        const licenseimgpath = req.files?.licenseimg[0]?.path;
        console.log(req.files)

        if (!licenseimgpath) {
            return res.status(200).send(
                {
                    message: "License image is complusory",
                    status: "notsuccess"
                }
            )
        }


        const licenseimage = await uploadOnCloudinary(licenseimgpath)

        // finally create a profile in the db by model.create

        const doctor = await Doctormodel.create({

            username,
            doctorage,
            email,
            mobileno,
            degree,
            doctorimg: doctorimage.url,
            specialization,
            licenseNo,
            licenseimg: licenseimage.url,
            isprofile: true,
            gender,
            address,
            DOB,
            status: true,
            biography


        })

        return res.status(200).send({
            message: "Doctor profile created successfully",
            data: doctor,
            status: "success"

        })

    } catch (error) {
        res.status(500).send({
            message: `doctor profile controller ${error.message} `,
            status: "notsuccess",

        })

    }

}
const viewprofileByEmail = async (req, res) => {
    try {
        const { email } = req.query

        const doctor = await Doctormodel.findOne({ email })
        if (!doctor) {
            return res.status(200).send({
                status: "notsuccess",
                message: "Doctor not found",


            });
        }

        res.status(200).send({
            data: doctor,
            status: "success",
            message: "Profile fetched successfully"
        })

    } catch (error) {
        res.status(500).send({
            message: `server error ${error}`
        })
    }

}

const updateprofileimg = async (req, res) => {
    try {
        const { id } = req.body;


        const doctorimgpath = req.files?.doctorimg[0]?.path
        console.log(doctorimgpath)
        if (!doctorimgpath) {
            res.status(200).send(
                {
                    message: "No file uploaded",
                    status: "notsuccess"
                }
            )
        }




        const doctorimage = await uploadOnCloudinary(doctorimgpath);

        const updatedDoctor = await Doctormodel.findByIdAndUpdate(
            id,
            {

                doctorimg: doctorimage?.url,

            },

            { new: true } // returns updated document
        );

        if (!updatedDoctor) {
            return res.status(404).send({ message: 'Doctor not found', status: "notsuccess" });
        }

        res.status(200).send({
            message: 'Profile updated successfully',
            doctor: updatedDoctor,
            Status: "success"
        });


    } catch (error) {
        res.status(500).send({
            message: `server error ${error}`
        })
    }

}


const updateDoctorProfile = async (req, res) => {
    try {

        const updateData = req.body;
        console.log("data to update", updateData)
        console.log(" doctorID from req.body:", req.body.doctorID) 
        console.log(" req.body:", req.body)

        updateData.updatedAt = new Date();

        const { doctorID, ...fieldsToUpdate } = updateData;
        console.log(" doctorId:", doctorID)

        const updatedDoctor = await Doctormodel.findByIdAndUpdate(
            doctorID,
            fieldsToUpdate,
            { new: true }
        );

        if (!updatedDoctor) {
            return res.status(404).send({ message: 'Doctor not found', status: "notsuccess" });
        }

        res.status(200).send({
            message: 'Profile updated successfully',
            doctor: updatedDoctor,
            status: "success"
        });
    } catch (error) {
        res.status(500).send({ message: 'Server Error', error: error.message, status: "notsuccess" });
    }
};


const getdoctorbyid = async (req, res) => {
    try {
        const { doctorID } = req.params

        const doctor = await Doctormodel.findOne({ _id: doctorID })
        if (!doctor) {
            return res.status(200).send({
                status: "notsuccess",
                message: "Doctor not found",


            });
        }

        res.status(200).send({
            data: doctor,
            status: "success",
            message: "Profile fetched successfully"
        })

    } catch (error) {
        res.status(500).send({
            message: `server error ${error}`
        })
    }

}




export { addDoctor, viewprofileByEmail, updateDoctorProfile, getdoctorbyid, updateprofileimg };