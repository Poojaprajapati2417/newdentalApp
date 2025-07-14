import React, { useState } from 'react';
import './../../styles/profile.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import FormData from "form-data"
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const DoctorProfileForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [imgstate, setimgstate] = useState(
    {
      doctorimg: "",
      licenseimg: ""
    }
  )
  const fileOnchange = (e) => {
    const { name, files } = e.target
    if (files[0]) {
      setimgstate({
        ...imgstate,
        [name]: files[0],

      })
    }
  }
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



  })
  const valueOnchange = (e) => {
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
      const formData = new FormData();

      formData.append('username', formvalue.username);
      formData.append('doctorage', formvalue.doctorage);
      formData.append('email', formvalue.email);
      formData.append('mobileno', formvalue.mobileno);
      formData.append('degree', formvalue.degree);
      formData.append('specialization', formvalue.specialization);
      formData.append('licenseNo', formvalue.licenseNo);
      formData.append('gender', formvalue.gender);
      formData.append('address', `${formvalue.address},${formvalue.city},${formvalue.state},${formvalue.country}-${formvalue.postalCode}`);
      formData.append('doctorimg', imgstate.doctorimg);
      formData.append('licenseimg', imgstate.licenseimg);
      formData.append('DOB', formvalue.DOB);
      formData.append('biography', formvalue.biography);








      const profileResponse = await axios.post("/Dental/doctor/add-doctor",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      console.log(profileResponse.data)
      if (profileResponse.data.status === "success") {
        console.log(profileResponse.data.email)
        localStorage.setItem("doctorEmail", profileResponse.data.data.email)
        navigate("/doctor/view")
        setLoading(false)

        Swal.fire({
          title: profileResponse.data.message,
          icon: "success",
          draggable: true
        });
        setFormvalue({
          username: "", doctorage: "", email: "", mobileno: "", degree: "", specialization: "",
          licenseNo: "", gender: "", address: "", city: "", state: "", country: "", postalCode: "", biography: "", DOB: "", 
        });
        setimgstate({ doctorimg: "", licenseimg: "" });

      }
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: profileResponse.data.message,

        });
        setLoading(false)
      }
    } catch (error) {
      console.log("error while creating profile", error)
      setLoading(false)
    }
  }

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="p-4">
        {/* Page Header */}
        <div className="mb-6">
          <ul className="flex items-center space-x-2 text-sm text-gray-500">
            
           
            <li className="text-blue-600 font-semibold">Add Doctor</li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handlesubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
              <div className="">
                <h4 className="text-lg font-semibold text-left mb-4">Doctor Details</h4>
              </div>


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

              {/* Avatar */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Profile Img <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name='doctorimg'
                  onChange={fileOnchange}
                  className="block w-full text-sm text-gray-500" />
              </div>
              {/*license img  */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  lisence Img <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  onChange={fileOnchange}
                  name='licenseimg' className="block w-full text-sm text-gray-500" />
              </div>

              {/* Submit Buttons */}
              <div className=" flex  text-right mt-4">
                <button type="submit" className="bg-blue-600  text-white px-4 py-2 rounded mr-2">
                  Submit
                </button>
                <button type="reset" className="bg-gray-400 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>

  );
};




export default DoctorProfileForm;
