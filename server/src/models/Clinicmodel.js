import mongoose from "mongoose"


const Clinicschema = new mongoose.Schema(
    {

        clinicname: {
            type: String,
            required: true,
            unique: true,
        },
        clinicimages: [
            {
                type: String,
                required: true,
                // unique: true,
            }
        ],
        address: {
            type: String,
            required: true,

        },

        state: {
            type: String,
            required: true

        },

        city: {
            type: String,
            required: true,
        },

        pincode: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true,

        },
        email:{
             type: String,
            required: true,

        },
        about: {
            type: String,
            required: true,
        },
        opentimings:{
            type:String,
            required:true
        },

          closetimings:{
            type:String,
            required:true
        },
        doctors: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        }],
        services: [{ type: String }],

        
        logo: {
            type: String,
            // required: true
        },
        fees: {
            type: String,
            required: true
        },
       
        clinicType: {
            type: String,
            required:true
            
        },






    },
    {
        timestamps: true
    }
)

export const Clinicmodel = mongoose.model("clinic", Clinicschema)

