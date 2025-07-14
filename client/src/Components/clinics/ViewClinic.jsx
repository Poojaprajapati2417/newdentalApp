import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import AdminPanel from '../adminPanel/AdminPanel';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const ViewClinic = () => {
    const [clinicData, setclinicData] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(false)

    const getClinicprofile = async () => {
        try {

            const profileresponse = await axios.post("/Dental/clinic/getclinicprofile", {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            },

                {
                    params: {
                        email: localStorage.getItem("CEmail")
                    }

                }
            )

            if (profileresponse.data.status === "success") {
                console.log(profileresponse)
                console.log( profileresponse.data.data._id)
                localStorage.setItem("clinicid", profileresponse.data.data._id)
                setclinicData(profileresponse.data.data)

            }
            
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: profileresponse.data.message,

                });
            }


        } catch (error) {
            console.log("error", error)

        }

    }



    const handleImageChange = async (e) => {
        setLoading(true)

        try {


            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("logo", file);
            formData.append("id", clinicData?._id)
            const response = await axios.post(
                `/Dental/clinic/logo`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.data.Status === "success") {
                setUpdated(prev => !prev)
                setLoading(false)
                Swal.fire({
                    title: response.data.message,
                    icon: "success",
                });
                console.log(response.data)

                setclinicData((prev) => ({
                    ...prev,
                    logo: response.data.data?.logo || prev.logo,
                }));
            } else {
                setLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.message,
                });
            }
        } catch (error) {
            console.error("Image update error:", error);
            setLoading(false)
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: error?.response?.data?.message || "Something went wrong!",
            });
        }
    };


    useEffect(() => {
        getClinicprofile()

    }, [updated])




    return (
        <AdminPanel>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={loading}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="container bg-white p-5 border rounded-[10px] w-full mx-auto my-[20px] bg-[#ffffff] shadow-[0 2px 5px rgba(0, 0, 0, 0.1)]  rounded-[20px]">
                {/* Profile Section */}
                <div className="profile-section flex flex-wrap w-full bg-[#f4f4f5] p-4 rounded-[20px] items-end justify-around">
                    <div className="imageDiv relative w-[150px] h-[150px] rounded-full flex items-center justify-center border-[7px] border-[#ffffff]" >
                        <img
                            src={clinicData?.logo || "default-logo.jpg"}
                            alt="logo"
                            className="profile-image w-full h-full rounded-full object-cover"
                        />
                        <input type="file"
                            id='uploadlogo'
                            name='logo'
                            className='hidden'
                            onChange={handleImageChange} />
                        <label htmlFor='uploadlogo' >
                            <p className="cursor-pointer h-[30px] w-[30px] bg-[#ffffff] rounded-full absolute bottom-0 right-2 flex items-center justify-center " ><AddIcon className='text-5xl' /></p>

                        </label>
                    </div>
                    <div className='flex-1 flex flex-col justify-between h-full gap-16  items-right'>
                        <div className='flex flex-col items-end'>
                            <h5 className='font-semibold text-sm'>
                                Clinic Timings
                            </h5>
                            <h6 className='text-xs'>
                                {clinicData?.opentimings} AM-{clinicData?.closetimings} PM
                            </h6>
                        </div>
                        <div className="profile-details flex align-start justify-between h-full  ml-4">
                            <h3 className='font-bold text-3xl'>
                                {` ${clinicData?.clinicname}`}</h3>
                            <div className='flex flex-col items-end'>

                                <h4 className='ml-6 text-[#333ca6]'>{clinicData?.contact}</h4>
                                <h4 className='ml-6 text-[#333ca6]'>{clinicData?.email}</h4>
                            </div>

                        </div>

                    </div>
                </div>
                <div className='flex flex-col lg:flex-row items-start justify-center'>
                    {/* About Section */}
                    <div className='w-full lg:w-1/3 '>
                        <div className="about-section bg-[#f4f4f5] p-4 rounded-[20px]  mr-4">
                            <div class=" ">


                                <h5 className='flex items-center text-sm font-bold gap-4 mb-2 '>About Us</h5>
                                <p className='text-sm leading-relaxed'>{clinicData?.about}</p>
                            </div>

                        </div>

                    </div>

                    <div className='flex1 w-full lg:w-2/3 p-4 mt-5 flex gap-4 flex-col gap-5 rounded-[20px]'>
                        <div className='flex justify-between gap-10 items-start'>
                            <div class="flex1">
                                <h5 className='font-bold text-sm mb-2'>Clinic Type</h5>
                                <p className='text-sm leading-relaxed'>
                                    {clinicData?.clinicType}
                                </p>
                            </div>

                            <div class="flex1">
                                <h5 className='font-bold text-sm mb-2'>Consultancy Fees</h5>
                                <p className='text-sm leading-relaxed'>
                                    {clinicData?.fees}
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-between gap-10 items-start'>
                            <div class="flex1">
                                <h5 className='font-bold text-sm mb-2'>Services available</h5>
                                <p className='text-sm leading-relaxed'>
                                    {clinicData?.services}
                                </p>
                            </div>

                            <div class="flex1">
                                <h5 className='font-bold text-sm mb-2'>Address</h5>
                                <p className='text-sm leading-relaxed'>
                                    {clinicData?.address}
                                </p>
                            </div>

                        </div>



                    </div>


                </div>
                <div className='mt-6 '>
                    <h3 className='text-md text-[#333ca6] font-bold my-4'>Doctors Available</h3>
                    <div className='flex items-center flex-wrap gap-10 bg-[#f4f4f5] p-4 rounded-[20px]'>
                        <div class="flex1">
                            <h5 className='font-medium text-sm text-[#333ca6] mb-1'>Doctor Name</h5>
                            <p className='text-sm leading-relaxed'>
                                {clinicData?.doctors[0].username}
                            </p>
                        </div>
                        <div class="flex1">
                            <h5 className='font-medium text-sm text-[#333ca6] mb-1'>Specialization</h5>
                            <p className='text-sm leading-relaxed'>
                                {clinicData?.doctors[0].specialization}
                            </p>
                        </div>
                        <div class="flex1">
                            <h5 className='font-medium text-sm text-[#333ca6] mb-1'>Email Id</h5>
                            <p className='text-sm leading-relaxed'>
                                {clinicData?.doctors[0].email}
                            </p>
                        </div>
                         <div class="flex1">
                            <h5 className='font-medium text-sm text-[#333ca6] mb-1'>Contact</h5>
                            <p className='text-sm leading-relaxed'>
                                {clinicData?.doctors[0].mobileno}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <h5 className='font-bold text-sm py-4'>Images</h5>
                    <div className='flex gap-4 flex-wrap'>
                        <div className='h-[200px] w-[250px]'>
                            <img
                                src={clinicData?.clinicimages || "default-images.jpg"}
                                alt="clinicImages"
                                className="profile-image h-full w-full rounded-4 object-cover border border-gray-200 border-4 p-2"
                            />
                        </div>
                        <div className='h-[200px] w-[250px]'>
                            <img
                                src={clinicData?.clinicimages || "default-images.jpg"}
                                alt="clinicImages"
                                className="profile-image h-full w-full rounded-4 object-cover border border-gray-200 border-4 p-2"
                            />
                        </div>
                        <div className='h-[200px] w-[250px]'>
                            <img
                                src={clinicData?.clinicimages || "default-images.jpg"}
                                alt="clinicImages"
                                className="profile-image h-full w-full rounded-4 object-cover border border-gray-200 border-4 p-2"
                            />
                        </div>
                    </div>
                </div>



                <button className='mt-4'>
                    <Link to={`/clinic/edit/${localStorage.getItem("clinicid")}`}

                    >Update</Link>
                </button>
            </div>
        </AdminPanel>


    )
}

export default ViewClinic;