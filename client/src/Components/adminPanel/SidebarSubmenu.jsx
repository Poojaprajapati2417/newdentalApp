import React from 'react'
import { Link,useLocation } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";


const SidebarSubmenu = ({ title, icon: Icon, isopen, onClick, sublinks }) => {
    const location=useLocation()
    return (
        <div>
            <li className=" submenu ml-2  ">
                <div className='flex justify-between gap-2 items-center text-2xl text-midium mb-4 '
                    onClick={onClick}
                >
                    <div className='flex items-center gap-3 text-[18px] '>
                        <span className= {`${isopen?"text-[#333ca6] text-xl":"text-gray-400"}`}>
                            {< Icon />}
                        </span>
                        <span className=  {`${isopen?"text-[#333ca6] ":"text-gray-400"}`}>
                            {title}
                        </span>
                    </div>
                    <span className={`mr-3 text-2xl font-bold transition-all duration-300 ease-in-out
                         ${ isopen  ? "rotate-90 text-[#333ca6]" : "rotate-0 text-gray-400"}`}>

                        <IoIosArrowForward />
                    </span>
                </div>
                <ul className={`ml-4 space-y-2 overflow-hidden transition-all duration-300 ease-in-out 
                    ${ isopen  ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                    {sublinks.map((link, index)=> {
                        const isActive=location.pathname===link.to
                        return(
                        <li key={index}
                            className={`block text-[14px] text-[rgba(46,55,164,0.5)] font-bold py-1 px-5 ${isActive?"text-[#333ca6]":"hover:text-[#333ca6]"}`}
                        >
                            <Link to={link.to}>{link.label}</Link>
                        </li>

                    )})}

                </ul>
            </li>
        </div>
    )
}

export default SidebarSubmenu