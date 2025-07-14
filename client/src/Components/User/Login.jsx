import React, { useEffect, useState } from 'react'
import "./../../styles/login.css"
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";


const Login = () => {
    const Navigate = useNavigate()
    // const [useremail, setUserEmail] = useState("")
    // console.log("myemail is", useremail)
    const [loading, setLoading] = useState(false)
    const [formvalue, setFormvalue] = useState({
        email: "",
        password: "",
        usertype: ""
    })
     const [viewPass, setViewPass] = useState(false)
    
        const handlePassView = () => {
            setViewPass((prev) => !prev);
        }
    const handlechange = (e) => {
        const { name, value } = e.target
        setFormvalue({
            ...formvalue,
            [name]: value
        })
    }
    const handlesubmit = async (e) => {
        setLoading(true)
        try {
            e.preventDefault()
            const loginresponse = await axios.post("/Dental/user/loginuser", formvalue)
            console.log(loginresponse.data)
            // console.log(loginresponse.data.user.email)
            if (loginresponse.data.status === "success") {
                setLoading(false)
                localStorage.setItem("email", loginresponse.data.user.email)
                localStorage.setItem("token", loginresponse.data.token)
                Swal.fire({
                    title: loginresponse.data.message,
                    icon: "success",
                    draggable: true
                })
                const profileresonse = await axios.post("/Dental/doctor/getdoctprofile",
                    {},
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                        ,
                        params: {
                            email: loginresponse.data.user.email

                        }
                    }



                )
                if (profileresonse.data.status === "success") {
                    Navigate("/doctor/view")
                }
                else {
                    Navigate("/add")
                }



                ;
            }
            else {


                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: loginresponse.data.message,
                })
                setLoading(false);

            }
        } catch (error) {
            setLoading(false)

            console.log("error while user logging in  ", error)
        }
    }
    return (

        <div className='w-1/2  m-auto'>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}

            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <div className="container w-1/2 m-auto">
                <div className="card">
                    <h2>Login</h2>
                    <form onSubmit={handlesubmit}>
                       
                         <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={handlechange}
                            value={formvalue.email}
                        />
                       
                       

                        <label>User Type</label>
                        <div >
                            <select name='usertype'
                                onChange={handlechange}>
                                <option value="">Select</option>
                                <option value="Admin">Admin</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Patient">Patient</option>

                            </select>
                        </div>
                        <div className='relative
                       '>
                        <input
                            type={viewPass ? "text" : "password"}
                            name="password"
                            placeholder="Password"
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
                        <button type="submit">Login</button>
                    </form>

                </div>
            </div>
        </div>

    )
}

export default Login