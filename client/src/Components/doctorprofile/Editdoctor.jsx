import React, { useEffect, useState } from 'react'
import AdminPanel from '../adminPanel/AdminPanel'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const Editdoctor = () => {
    const params = useParams()
    let doctorID = params.id
    console.log(doctorID)
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [imgstate, setimgstate] = useState(
        {
            doctorimg: "",
            licenseimg: ""
        }
    )
    
    const [formvalue, setFormvalue] = useState({

        username: "",
        doctorage: "",
        email: "",
        mobileno: "",
        degree: "",
        specialization: "",
        licenseNo: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        biography: "",
        DOB: "",
        password: "",



    })



    const valueOnchange = (e) => {
        const { name, value } = e.target
        setFormvalue({
            ...formvalue,
            [name]: value
        })
    }
    const getdata = async () => {
        const response = await axios.get(`/Dental/doctor/getdata/${doctorID}`)
        console.log(response.data.data)
        setFormvalue(response.data.data)
    }
    useEffect(() => {
        getdata()
    }, [])
    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const updatedData={
                ...formvalue,
                doctorID:doctorID
            }

            const profileResponse = await axios.post(`/Dental/doctor/updateDoctorProfile`,
                updatedData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            console.log(profileResponse.data)
            if (profileResponse.data.status === "success") {
                console.log(profileResponse.data.doctor.email)
                localStorage.setItem("doctorEmail", profileResponse.data.doctor.email)
                setLoading(false)

                Swal.fire({
                    title: profileResponse.data.message,
                    icon: "success",
                    draggable: true
                });
                Navigate("/doctor/view")

                setFormvalue({
                    username: "", doctorage: "", email: "", mobileno: "", degree: "", specialization: "",
                    licenseNo: "", gender: "", address: "", city: "", state: "", country: "", postalCode: "", biography: "", DOB: "", password: ""
                });
                // setimgstate({ doctorimg: "", licenseimg: "" });

            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: profileResponse.data.message,

                });
            }
        } catch (error) {
            console.log("error while creating profile", error)
            setLoading(false)
        }
    }

    return (
        <AdminPanel>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="page-wrapper" onSubmit={handlesubmit}>
                <div className="content">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={"/admin"}>Doctors </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Edit Doctor</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handlesubmit}>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-heading">
                                                    <h4>Doctor Details</h4>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-xl-4">
                                                <div>
                                                    <label className="block text-sm  font-medium mb-1">
                                                        Username <span className="text-red-500">*</span>
                                                    </label>
                                                    <input type="text"
                                                        name='username'
                                                        value={formvalue.username}
                                                        onChange={valueOnchange}
                                                        className="w-full border rounded px-3 py-2" />
                                                </div>
                                            </div>


                                            {/* Mobile */}
                                            <div className="">
                                                <label className="block text-sm font-medium mb-1">
                                                    Mobile <span className="text-red-500">*</span>
                                                </label>
                                                <input type="text"
                                                    name='mobileno'
                                                    value={formvalue.mobileno}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2" />
                                            </div>
                                            {/* Email */}
                                            <div className="" >
                                                <label className="block text-sm font-medium mb-1">
                                                    Email <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name='email'
                                                    value={formvalue.email}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2" />
                                            </div>
                                          
                                           
                                            {/* Date of Birth */}
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Date of Birth <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    name='DOB'
                                                    value={formvalue.DOB}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2" />
                                            </div>

                                            {/* Gender */}
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Gender <span className="text-red-500">*</span>
                                                </label>
                                                <div className="flex items-center space-x-4">
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value={"Male"}
                                                            checked={formvalue.gender === "Male"}
                                                            onChange={valueOnchange}
                                                            className="mr-2" /> Male
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="gender"
                                                            value={"Female"}
                                                            checked={formvalue.gender === "Female"}
                                                            onChange={valueOnchange}
                                                            className="mr-2" /> Female
                                                    </label>
                                                </div>
                                            </div>
                                            {/* age */}
                                            <div className="" >
                                                <label className="block text-sm font-medium mb-1">
                                                    Age <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name='doctorage'
                                                    value={formvalue.doctorage}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2" />
                                            </div>
                                            {/* Education */}
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Education <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name='degree'
                                                    value={formvalue.degree}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2" />
                                            </div>

                                            {/* specialization */}
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    specialization <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name='specialization'
                                                    value={formvalue.specialization}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2" />
                                            </div>



                                            {/* license no */}
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    license no. <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name='licenseNo'
                                                    value={formvalue.licenseNo}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2" />
                                            </div>

                                            {/* Address */}
                                            <div className="">
                                                <label className="block text-sm font-medium mb-1">
                                                    Address <span className="text-red-500">*</span>
                                                </label>
                                                <textarea
                                                    rows="3"
                                                    name='address'
                                                    value={formvalue.address}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2"></textarea>
                                            </div>

                                            {/* City */}
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    City <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    name='city'
                                                    value={formvalue.city}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2">
                                                    <option value={""}>Select City</option>
                                                    <option value={"Alaska"}>Alaska</option>
                                                    <option value={"LosAngeles"}>Los Angeles</option>
                                                </select>
                                            </div>



                                            {/* State */}
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    State/Province <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    name='state'
                                                    value={formvalue.state}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2">
                                                    <option value={""}>Select State</option>
                                                    <option value={"Alaska"}>Alaska</option>
                                                    <option value={"California"}>California</option>
                                                </select>
                                            </div>
                                            {/* Country */}
                                            <div>
                                                <label
                                                    className="block text-sm font-medium mb-1">
                                                    Country <span className="text-red-500">*</span>
                                                </label>
                                                <select
                                                    onChange={valueOnchange}
                                                    name='country'
                                                    value={formvalue.country}
                                                    className="w-full border rounded px-3 py-2">
                                                    <option value={""}>Select Country</option>
                                                    <option value={"USA"}>USA</option>
                                                    <option value={"UK"}>UK</option>
                                                    <option value={"Italy"}>Italy</option>
                                                </select>
                                            </div>
                                            {/* Postal Code */}
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Postal Code <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name='postalCode'
                                                    value={formvalue.postalCode}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2" />
                                            </div>

                                            {/* Biography */}
                                            <div className="md:col-span-2 xl:col-span-3">
                                                <label className="block text-sm font-medium mb-1">
                                                    Short Biography <span className="text-red-500">*</span>
                                                </label>
                                                <textarea
                                                    rows="3"
                                                    name='biography'
                                                    value={formvalue.biography}
                                                    onChange={valueOnchange}
                                                    className="w-full border rounded px-3 py-2"></textarea>
                                            </div>

                                            <div >
                                                <div className="doctor-submit text-end flex">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary submit-form me-2"
                                                    >
                                                        Submit
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary cancel-form"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </AdminPanel>

    )
}

export default Editdoctor