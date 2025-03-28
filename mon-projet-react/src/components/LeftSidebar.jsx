import React, { useState, useEffect } from 'react';
import { FaHome, FaEnvelope, FaBookmark, FaUser,FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";  
import "bootstrap/dist/js/bootstrap.bundle.min";  
import { fetchUser } from '../utils/api';
import { Link } from "react-router-dom";


function LeftSidebar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        
        if (!token) {
          navigate("/");
          return;
        }
    const user = await fetchUser(token);
    console.log("User data structure:", user);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/");
      }
    };
    
    getUserData();
  }, [navigate]);
  
  return (
    <div className="navbar">
      <div className="navbar-container">
      <div className="navbar__logo d-none d-sm-block">
      <img src="./assets/RMAJ.png" style={{ width: '70px', height: '70px' } }alt="Logo X" />
      </div>
      <ul className="navbar__menu">
        <li onClick={()=>navigate("/MainContent")}><FaHome /> <span> Home</span></li>
        {/* <li onClick={()=>navigate("/Notification")}><FaBell /><span>  Notifications</span></li> */}
        <li onClick={()=>navigate("/Messages")}><FaEnvelope /> <span> Messages</span></li>
        <li onClick={()=>navigate("/Bookmarks")}><FaBookmark /><span>  Bookmarks</span></li>
        <li onClick={()=>navigate("/Profile")}><FaUser /><span>  Profile</span></li>
        <li onClick={()=>navigate("/RightSideBar")}><FaSearch /><span> Search</span></li>
      </ul>
      
  
      <div className="navbar__profile d-none d-sm-block"  data-bs-toggle="modal"
        data-bs-target="#myProfile">
        {userData && (
        <div className="navbar__profile-img">
<Link to={`/Profile`}>
  <img
    src={userData.profile_picture}
    alt={` ${userData.display_name}`}
    style={{ width: '70px', height: '70px', borderRadius: '50%' }}
  />
</Link>
        </div>
        )}
        {userData && (
          <div className="navbar__profile-names">
            <p className="navbar__profile-name"><span>{userData.name}</span></p>
            <p className='navbar__profile-username'><span>{userData.email}</span></p>
          </div> 
        )}
      </div>
    </div>
    </div>
  );
}

export default LeftSidebar;