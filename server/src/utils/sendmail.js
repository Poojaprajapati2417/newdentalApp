import nodemailer from "nodemailer";


const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    secure:true,
    tls: {
    rejectUnauthorized: false, // Ignore self-signed certificate
  },
    auth:{
        user:"shailenderbhati96@gmail.com",
        pass:"gjxsnnarervxdqvb"


    }


})

async function sendemail(email,message,text){

    const info=await transporter.sendMail({
        from:"shailenderbhati96@gmail.com",
        to:email,
        subject:message,
        html:`<a href=${text}>${text}</a>`



    })

    console.log("Message sent to your email:", info.messageId)
    
}

export default sendemail;