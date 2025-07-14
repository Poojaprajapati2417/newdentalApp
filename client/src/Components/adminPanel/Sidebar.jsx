import React, { useState } from 'react'
import { MdDashboard } from "react-icons/md";
// import { IoIosArrowForward } from "react-icons/io";
import SidebarSubmenu from './SidebarSubmenu';
import { FaHospitalUser } from "react-icons/fa";
import { FaProcedures } from 'react-icons/fa';
import { FaClinicMedical } from "react-icons/fa";



const Sidebar = ({ className }) => {
    const [handleDropdown, setHandleDropdown] = useState("")

    const toggleDropdown = (name) => {
        setHandleDropdown(handleDropdown === name ? "" : name)
        
    }
    const doctorid=localStorage.getItem("doctorid")
    return (
        <div className={`sidebar ${className} `}>
            <div className="sidebar-inner overflow-hidden w-full px-2  h-[491px]">
                <h2 className="text-[#333] text-[15px] px-2  font-bold  text-left">Main</h2>
                {/* /dashboard */}
                <ul className="text-sm list-none">
                    <div className='flex items-center justify-start gap-3 text-[16px] text-[rgb(51_60_166)]'>
                        <MdDashboard size={25} />
                        <h2 className='font-bold text-[rgb(51_60_166)]'>Doctor Dashboard</h2>
                    </div>

                    {/* Dropdown for Doctors */}
                    
                    <SidebarSubmenu
                        title="Doctor"
                        icon={FaHospitalUser}
                        isopen={handleDropdown === "Doctor"}
                        onClick={() => toggleDropdown("Doctor")}
                        sublinks={
                            [
                                { label: "Edit Profile", to: `/doctor/edit/${doctorid}` },
                                { label: "View Profile ", to: "/doctor/view" }


                            ]}

                    />

                    {/* Dropdown for patients */}
                    <SidebarSubmenu
                        title="Patient"
                        icon={FaProcedures}
                        isopen={handleDropdown === "Patient"}
                        onClick={() => toggleDropdown("Patient")}
                        sublinks={
                            [
                                { label: "view Patient", to: "/patients/view" },


                            ]}

                    />
                     <SidebarSubmenu
                        title="Clinics"
                        icon={FaClinicMedical}
                        isopen={handleDropdown === "Clinics"}
                        onClick={() => toggleDropdown("Clinics")}
                        sublinks={
                            [
                                { label: "Add Clinics", to: "/Clinics/add"},
                                { label: "View Clinics", to: "/Clinics/view"},


                            ]}

                    />
                </ul>
            </div>

        </div>
    )
}

export default Sidebar