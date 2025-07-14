import React, { useEffect, useState } from 'react'
import "./../../styles/view-profile.css"
import axios from 'axios'
import Swal from 'sweetalert2'
import { FaStethoscope } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import AdminPanel from '../adminPanel/AdminPanel';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const ViewProfile = () => {
  const [profiledata, setProfiledata] = useState(null)
  const [updated, setUpdated] = useState(false)
  const [loading,setLoading]=useState(false)

  const getdoctorprofile = async () => {
    try {

      const profileresponse = await axios.post("/Dental/doctor/getdoctprofile", {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      },

        {
          params: {
            email: localStorage.getItem("doctorEmail")
          }

        }
      )

      if (profileresponse.data.status === "success") {
        console.log(profileresponse)
        localStorage.setItem("doctorid", profileresponse.data.data._id)
        setProfiledata(profileresponse.data.data)

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
      formData.append("doctorimg", file);
      formData.append("id", profiledata?._id)
      const response = await axios.post(
        `/Dental/doctor/updateprofileimg`,
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

        setProfiledata((prev) => ({
          ...prev,
          doctorimg: response.data.doctor?.doctorimg || prev.doctorimg,
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
    getdoctorprofile()

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
        <div className="profile-section flex w-full bg-[#f4f4f5] p-4 rounded-[20px] items-end ">
          <div className="imageDiv relative w-[150px] h-[150px] rounded-full flex items-center justify-center border-[7px] border-[#ffffff]" >
            <img
              src={profiledata?.doctorimg || "default-profile.jpg"}
              alt="Profile Picture"
              className="profile-image w-full h-full rounded-full object-cover"
            />
            <input type="file"
              id='uploadProfileImg'
              name='doctorimg'
              className='hidden'
              onChange={handleImageChange} />
            <label htmlFor='uploadProfileImg' >
              <p className="cursor-pointer h-[30px] w-[30px] bg-[#ffffff] rounded-full absolute bottom-0 right-2 flex items-center justify-center " ><AddIcon className='text-5xl' /></p>

            </label>
          </div>
          <div className="profile-details  ml-4">
            <h3 className='font-bold'>
              {`Dr ${profiledata?.username}`}</h3>
            <h4 className='ml-6 text-[#333ca6]'>{profiledata?.specialization}</h4>

          </div>
        </div>
        {/* About Section */}
        <div className="about-section">
          <div class="flex1">


            <h5 className='flex items-center font-bold gap-2 justify-'><MdOutlineMailOutline />Degree</h5>
            <p>{profiledata?.degree}</p>
          </div>
          <div class="flex1">


            <h5 className='flex items-center font-bold gap-2 justify-'><MdOutlineMailOutline />Email</h5>
            <p>{profiledata?.email}</p>
          </div>
          <div >
            <h5 className='font-bold'>Phone</h5>
            <p>{profiledata?.mobileno}</p>
          </div>

          <div className=''>
            <h5 className='font-bold'>Age</h5>
            <p>
              {profiledata?.doctorage}
            </p>
          </div>
          <div class="flex1">
            <h5 className='font-bold'>Gender</h5>
            <p>
              {profiledata?.gender}
            </p>
          </div>
          <div class="flex1">
            <h5 className='font-bold'>License No.</h5>
            <p>
              {profiledata?.licenseNo}
            </p>
          </div>
          <div class="flex1">
            <h5 className='font-bold'>Address</h5>
            <p>
              {profiledata?.address}
            </p>
          </div>
        </div>


        <button className='mt-4'>
          <Link to={`/doctor/edit/${localStorage.getItem("doctorid")}`}

          >Update</Link>
        </button>
      </div>
    </AdminPanel>


  )
}

export default ViewProfile;