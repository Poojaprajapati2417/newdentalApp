import { useEffect, useState, react } from 'react'
import AdminPanel from '../adminPanel/AdminPanel'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


const Editclinic = () => {
    const params = useParams()
    let clinicid = params.id
    console.log(clinicid)
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false)


    const [formvalue, setFormvalue] = useState({



        clinicname: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
        contact: "",
        about: "",
        opentimings: "",
        closetimings: "",
        doctors: [],
        services: [],
        fees: "",
        clinicType: "",



    })
    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
        "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
        "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
        "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
        "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
        "Ladakh", "Lakshadweep", "Puducherry"
    ];
    const valueOnchange = (e) => {
        const { name, value } = e.target
        setFormvalue({
            ...formvalue,
            [name]: value
        })
    }

    const getdata = async () => {
        if (!clinicid) return;
        try {

            const response = await axios.get(`/Dental/clinic/getdata/${clinicid}`)
            console.log(response.data.data)
            if (response.data.Status === "success") {
                setFormvalue(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching clinic data:", error);
        }
    }
    useEffect(() => {
        getdata()
    }, [])
    const handlesubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const updatedData = {
                ...formvalue,
                clinicid: clinicid
            }

            const profileResponse = await axios.post(`/Dental/clinic/updateClinicProfile`,
                updatedData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            console.log(profileResponse.data)
            if (profileResponse.data.Status === "success") {
                console.log(profileResponse.data.clinic.email)
                localStorage.setItem("ClinicEmail", profileResponse.data.clinic.email)
                setLoading(false)

                Swal.fire({
                    title: profileResponse.data.message,
                    icon: "success",
                    draggable: true
                });
                Navigate("/Clinics/view")

                setFormvalue({
                    clinicname: "",
                    address: "",
                    state: "",
                    city: "",
                    pincode: "",
                    contact: "",
                    about: "",
                    opentimings: "",
                    closetimings: "",
                    doctors: [],
                    services: [],
                    fees: "",
                    clinicType: "",


                });

            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: profileResponse.data.message,

                });
            }
        } catch (error) {
            console.log("error while updating profile", error)
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
            <div className="p-4">
                {/* Page Header */}
                <div className="mb-6">
                    <ul className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <a href="doctors.html" className="text-blue-600 hover:underline">
                                Clinics
                            </a>
                        </li>
                        <li>
                            <span className="text-gray-400">/</span>
                        </li>
                        <li className="text-gray-800 font-semibold"> Clinic</li>
                    </ul>
                </div>

                <div className="bg-white shadow-md rounded-lg max-w-7xl mx-auto px-4 py-6 sm:px-6 md:px-8">
                    <form onSubmit={handlesubmit}>
                        <div className="w-full">
                            <h4 className="text-lg font-semibold text-left mb-4">Clinic Details</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">



                            <div className="w-full">
                                <label className="block text-sm  font-medium mb-1">
                                    Clinicname <span className="text-red-500">*</span>
                                </label>
                                <input type="text"
                                    name='clinicname'
                                    value={formvalue.clinicname}
                                    onChange={valueOnchange}
                                    className="w-full border rounded px-3 py-2" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm  font-medium mb-1">
                                    Contact <span className="text-red-500">*</span>
                                </label>
                                <input type="text"
                                    name='contact'
                                    value={formvalue.contact}
                                    onChange={valueOnchange}
                                    className="w-full border rounded px-3 py-2" />
                            </div>

                            <div className="w-full">
                                <label className="block text-sm  font-medium mb-1">
                                    email <span className="text-red-500">*</span>
                                </label>
                                <input type="email"
                                    name='email'
                                    value={formvalue.email}
                                    onChange={valueOnchange}
                                    className="w-full border rounded px-3 py-2" />
                            </div>

                            {/* address */}
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-1">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <input type="text"
                                    name='address'
                                    value={formvalue.address}
                                    onChange={valueOnchange}
                                    className="w-full border rounded px-3 py-2" />
                            </div>
                            {/* city */}
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-1">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name='city'
                                    value={formvalue.city}
                                    onChange={valueOnchange}
                                    className="w-full border rounded px-3 py-2" />
                            </div>
                            {/* state */}
                            <div className="w-full" >
                                <label className="block text-sm font-medium mb-1">
                                    State <span className="text-red-500">*</span>
                                </label>
                                <select name="state" value={formvalue.state}
                                    onChange={valueOnchange}>
                                    <option value="">-- Select State --</option>
                                    {indianStates.map((state) => {
                                        return <option className='w-[80%] h-[100px]' key={state} value={state}>{state}</option>
                                    })}
                                </select>
                            </div>



                            {/* pincode */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium mb-1">
                                    Pincode <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name='pincode'
                                    value={formvalue.pincode}
                                    onChange={valueOnchange}
                                    className="w-full border rounded px-3 py-2" />
                            </div>
                            {/* contact */}
                            <div className="w-full" >
                                <label className="block text-sm font-medium mb-1">
                                    Contact <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name='contact'
                                    value={formvalue.contact}
                                    onChange={valueOnchange}
                                    className="w-full border rounded px-3 py-2" />
                            </div>
                            {/* about */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium mb-1">
                                    About <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows="2"
                                    name='about'
                                    value={formvalue.about}
                                    onChange={valueOnchange}
                                    className="w-full border rounded px-3 py-2"></textarea>
                            </div>

                            {/* opentimings */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium mb-1">
                                    Opening Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    name="opentimings"
                                    value={formvalue.opentimings}
                                    onChange={valueOnchange}
                                    className="w-full border rounded p-2"
                                />
                            </div>



                            {/*closetimings */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium mb-1">
                                    Closing Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="time"
                                    name="closetimings"
                                    value={formvalue.closetimings}
                                    onChange={valueOnchange}
                                    className="w-full border rounded p-2"
                                />
                            </div>

                            {/* services */}
                            <div className="w-full">
                                <label className="block text-sm font-medium mb-1">
                                    services <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    rows="2"
                                    name='services'
                                    value={formvalue.services}
                                    onChange={valueOnchange}
                                    className="w-full border rounded px-3 py-2"></textarea>
                            </div>

                            {/* fees */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium mb-1">
                                    fees <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name='fees'
                                    value={formvalue.fees}
                                    onChange={valueOnchange}
                                    className="w-full border rounded px-3 py-2" />
                            </div>



                            {/* clinicType */}
                            <div className='w-full'>
                                <label className="block text-sm font-medium mb-1">
                                    clinic Type <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name='clinicType'
                                    value={formvalue.clinicType}
                                    onChange={valueOnchange}
                                    className="w-full border rounded px-3 py-2" />
                            </div>







                            {/* Submit Buttons */}
                            <div className=" flex  gap-2  text-right mt-4">
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
        </AdminPanel>

    )
}

export default Editclinic