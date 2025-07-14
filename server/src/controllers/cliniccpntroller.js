import { Clinicmodel } from "../models/Clinicmodel.js";
import { Doctormodel } from "../models/Doctormodel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const addClinic = async (req, res) => {
    try {
        const { clinicname, address, state, city, pincode, contact, email, about, opentimings, closetimings, services, fees, clinicType, doctorId } = req.body



        const clinicimgpath = req.files?.clinicimages.map((file)=>file.path);
     

        const logoimgpath = req.files?.logo[0]?.path;





        if (!clinicimgpath) {
            return res.status(200).send(
                {
                    message: "Clinic image is complusory",
                    status: "notsuccess"
                }
            )
        }

        if (!logoimgpath) {
            return res.status(200).send(
                {
                    message: "Logo image is complusory",
                    status: "notsuccess"
                }
            )
        }


        const clinicimagesurl=[]


        for(const path of clinicimgpath){

            const clinicimage = await uploadOnCloudinary(path)
            clinicimagesurl.push(clinicimage.url)
        }


        console.log(clinicimagesurl)



        
        const logoimage = await uploadOnCloudinary(logoimgpath)








        if ([clinicname, address, state, city, pincode, email, contact, about, opentimings, closetimings, fees, clinicType].some((field) => {
            return (
                field === undefined ||
                field === null ||
                String(field).trim() === ""
            );
        })) {
            return res.status(200).send(
                {
                    message: "All fields are required",
                    status: "notsuccess",
                    clinicprofile: clinic
                }
            )
        }

        const doctor = await Doctormodel.findById({ _id: doctorId });
        console.log(doctor)

        if (!doctor) {
            return res.status(200).send(
                {
                    message: 'Doctor not registered',
                    status: 'notsuccess'
                }
            )
        }



        const clinic = await Clinicmodel.create(
            {
                clinicname,
                address,
                state,
                city,
                pincode,
                contact,
                email,
                about,
                opentimings,
                closetimings,
                services,
                fees,
                clinicType,
                doctors: doctor,
                logo: logoimage.url,
                clinicimages: clinicimagesurl




            }
        )

        const populatedclinic = await Clinicmodel.findById(clinic._id).populate("doctors")


        return res.status(200).send(
            {
                message: "Clinic Added successfully",
                status: "success",
                profile: populatedclinic

            }
        )






    } catch (error) {
        return res.status(500).send(
            {
                message: `Server error is ${error}`,
                status: "failed"
            }
        )

    }

}


const getprofileByEmail = async (req, res) => {
    try {
        const { email } = req.query

        const clinic = await Clinicmodel.findOne({ email })
        if (!clinic) {
            return res.status(200).send({
                status: "notsuccess",
                message: "clinic not found",


            });
        }
        const populatedclinic = await Clinicmodel.findById(clinic._id).populate("doctors")


        res.status(200).send({
            data: populatedclinic,
            status: "success",
            message: "Profile fetched successfully"
        })

    } catch (error) {
        res.status(500).send({
            message: `server error ${error}`
        })
    }

}

const updatelogo = async (req, res) => {
    try {
        const { id } = req.body

        const logopath = req.files?.logo[0]?.path
        console.log(logopath)

        if (!logopath) {
            res.status(200).send(
                {
                    Status: "notsuccess",
                    message: "No image selected"
                }
            )
        }


        const logoimg = await uploadOnCloudinary(logopath)

        const updatedclinic = await Clinicmodel.findByIdAndUpdate(
            id,
            {
                logo: logoimg.url
            },
            { new: true }
        )
        if (!updatedclinic) {
            res.status(200).send(
                {
                    Status: "notsuccess",
                    message: "Clinic not found"
                }
            )
        }

        res.status(200).send({
            Status: "success",
            message: "logo updated Successfully",
            data: updatedclinic
        })
    } catch (error) {
        res.status(500).send({
            message: "error while uploading logo", error
        })
    }


}

const getclinicByid = async (req, res) => {


    try {
        const { clinicid } = req.params
        console.log("Clinic ID received in params:", req.params.clinicid);

        const clinic = await Clinicmodel.findOne({ _id: clinicid })


        if (!clinic) {
            res.status(200).send({
                Status: "notsuccess",
                message: "Clinic Data not found"
            })
        }
        res.status(200).send({
            Status: "success",
            message: "Clinic Data Fetched Successfully!",
            data: clinic
        })
    } catch (error) {
        res.status(500).send({
            message: "server", error
        })
    }
}

const updateClinicProfile = async (req, res) => {
    try {
        const updatedData = req.body
        updatedData.updatedAt = new Date();
        const { clinicid, ...fieldsToUpdate } = updatedData



        const updatedClinic = await Clinicmodel.findByIdAndUpdate(
            clinicid,
            fieldsToUpdate,
            { new: true }
        )
        if (!updatedClinic) {
            return res.status(200).send({
                Status: "notsuccess",
                message: "Clinic not found"
            })
        }
        res.status(200).send({
            Status: "success",
            message: "Clinic updated successfully",
            clinic: updatedClinic
        })

    } catch (error) {
        console.error("Error in updateClinicProfile:", error);
        res.status(500).send({
            Status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
}



export { addClinic, getprofileByEmail, updatelogo, getclinicByid, updateClinicProfile }