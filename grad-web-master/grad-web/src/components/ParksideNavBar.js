import { FaUserCircle } from "react-icons/fa";
import { SlMenu } from "react-icons/sl";
import { GrClose } from "react-icons/gr";
import uwpLogo from './icon/uwp.png';
import { Link } from 'react-router-dom';
import {useState} from 'react';


const ParkSideNavBar = () => {
    const [toggle, setToggle] = useState(false);

    const linkToParksideHomePage = "https://www.uwp.edu/";
    const linkToUWPLogins = "https://www.uwp.edu/logins/";
    const linkToContactUs = "https://www.uwp.edu/explore/contactus/";
    
    return (
        <nav className=" z-5 bg-[#1d6834] w-full  flex py-4 justify-between items-center navbar relative pb-5" >
            <div>
                 <img className='' src={uwpLogo} alt="Parkside logo" />
            </div>
            <div>
                <h1 className='text-center text-white text-2xl font-bold '>Graduation Planner</h1>
            </div>
                
            {/* desktop navbar */}
            <div className='mr-10 '>
                <ul className='list-none lg:flex hidden text-white font-bold  flex-1 cursor-pointer absolute top-5 right-5 '>
                    <li className='hover:underline pr-5 '><a href={linkToParksideHomePage}>Home</a></li>
                    <li className='hover:underline pr-5'><a href={linkToUWPLogins}>Logins</a></li>
                    <li className='hover:underline pr-5'><a href={linkToContactUs}>Contact Us</a></li>
                    <li className='pr-5'><Link to="/user">
                        <FaUserCircle className='h-full rounded-full hover:scale-150  '/>
                        </Link>  
                    </li>
                </ul>
            </div>
            <br/>
            {/* mobile navbar */}
            <div className='lg:hidden flex flex-1 justify-end items-center mr-10 '>
                <button onClick={() => setToggle((prev) => !prev)}>
                    {toggle? <GrClose className='text-white w-7 h-7'/>: <SlMenu className='text-white w-7 h-7'/> }
                </button>
               
               <div className={`${toggle ? 'flex': 'hidden'} p-6 absolute top-20 right-0 
                min-w-[140px] bg-[#303030] w-full mb-20 md:mt-10 `} >
                    <ul className='  text-white '>
                        <li className='hover:underline p-4  '><a href={linkToParksideHomePage}>Home</a></li>
                        <li className='hover:underline p-4'><a href={linkToUWPLogins}>Logins</a></li>
                        <li className='hover:underline p-4'><a href={linkToContactUs}>Contact Us</a></li>
                        <li className='p-4 pl-10'><Link to="/user">
                            <FaUserCircle className='h-full rounded-full hover:scale-150  '/>
                            </Link>  
                        </li>
                    </ul>
               </div>
                 
                
            </div>
            <br/>    
            
        </nav>
    );
};
 
export default ParkSideNavBar;