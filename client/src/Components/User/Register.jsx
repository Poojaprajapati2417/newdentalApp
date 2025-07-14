import React, { useState } from 'react'
import "./../../styles/register.css"
import axios from "axios"
import Swal from 'sweetalert2'
import FormData from "form-data"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {
    const navigate = useNavigate()
    const [profileimg, setProfileimg] = useState(null)
    const [loading, setLoading] = useState(false)

    const [formvalue, setFormvalue] = useState({
        email: "",
        mobileNo: "",
        usertype: "",
        password: "",
        confirmPassword: ""


    })

    const [viewPass, setViewPass] = useState(false)

    const handlePassView = () => {
        setViewPass((prev) => !prev);
    }
    const [viewCPass, setViewCPass] = useState(false)

    const handleCPassView = () => {
        setViewCPass((prev) => !prev);
    }


    const handlechange = (e) => {
        const { name, value } = e.target

        setFormvalue({
            ...formvalue,
            [name]: value
        })
    }

    const handlesubmit = async (e) => {



        try {
            e.preventDefault()
            setLoading(true)
            if (formvalue.password !== formvalue.confirmPassword) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Confirm password did not match the Password",

                });
                setLoading(false);  
                return;
            }
            const formData = new FormData();
            formData.append('email', formvalue.email);
            formData.append('mobileNo', formvalue.mobileNo);
            formData.append('usertype', formvalue.usertype);
            formData.append('password', formvalue.password);
            const registerResponse = await axios.post("/Dental/user/createuser",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                },

            );
            console.log(registerResponse.data)
            if (registerResponse.data.status === "success") {
                setLoading(false)


                Swal.fire({
                    title: registerResponse.data.message,
                    icon: "success",
                    draggable: true
                });
                navigate("/login")
            }
            else {
                setLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: registerResponse.data.message,

                });
            }
        } catch (error) {
            setLoading(false)
            console.log("error registering user", error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,

            });
        }


    }

    return (

        <React.Fragment>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}

            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className="wrapper">
                <p className='my-2 text-right text-blue-500 text-sm  '>Already registered?<Link to="/login"> Login</Link></p>

                <div className="title">Registration Form</div>

                <form className="form" onSubmit={handlesubmit}>
                    <div className="inputfield">
                        <label>Email</label>
                        <input type="email"
                            className="input"
                            name='email'
                            onChange={handlechange}
                            value={formvalue.email}
                        />
                    </div>
                    <div className="inputfield">
                        <label>Phone number</label>
                        <input type="text"
                            className="input"
                            name='mobileNo'
                            onChange={handlechange}
                            value={formvalue.mobileNo}
                        />
                    </div>
                    <div className="inputfield">
                        <label>User Type</label>
                        <div className="custom_select">
                            <select name='usertype'
                                onChange={handlechange}>
                                <option value="">Select</option>
                                <option value="Admin">Admin</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Patient">Patient</option>

                            </select>
                        </div>
                    </div>


                    <div className="inputfield relative">
                        <label>Password</label>
                        <input type={viewPass ? "text" : "password"}
                            className="input "
                            name='password'
                            onChange={handlechange}
                            value={formvalue.password}
                        />
                        <span
                            className="absolute  right-3 top-1/3 transform -translate-y-1/2 cursor-pointer text-grey-500"
                            onClick={handlePassView}
                        >
                            {viewPass ? <IoIosEyeOff /> : <IoIosEye />}
                        </span>
                    </div>
                    <div className="inputfield relative">
                        <label>Confirm Password</label>
                        <input type={viewCPass ? "text" : "password"}
                            className="input"
                            name='confirmPassword'
                            onChange={handlechange}
                            value={formvalue.confirmPassword}

                        />
                        <span
                            className="absolute  right-3 top-1/3 transform -translate-y-1/2 cursor-pointer text-grey-500"
                            onClick={handleCPassView}
                        >
                            {viewCPass ? <IoIosEyeOff /> : <IoIosEye />}
                        </span>
                    </div>






                    <div className="inputfield">
                        <input type="submit" defaultValue="Register" className="btn" />
                    </div>
                </form>

            </div>
        </React.Fragment>

    )
}

export default Register