import React from "react";
import "../styles/Layout.css";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import { adminMenu, userMenu } from "../Data/data";
import { useSelector } from "react-redux";
import {message,Badge} from 'antd';

const Layout = ({ children }) => {
  const location = useLocation();
  const Navigate=useNavigate();
  const { user } = useSelector((state) => state.user)  
  // console.log("user is ",user)

  const handleLogout=()=>{
    localStorage.clear()
    message.success("logout successfully")
    Navigate('/login')
  }

  // *******************************************doctor menu***************
  const doctorMenu=[
    {
        name:"Home",
        path:"/",
        icon:"fa-solid fa-house",
    },
    {
        name:"Appointment",
        path:"/doctor-appointments",
        icon:"fa-solid fa-calendar-check",
    },
    {
        name:"Profile",
        path:`/doctor/profile/${user && user._id}`,
        icon:"fa-solid fa-user"
    },
]


  // const sidebarMenu = ((user && user.isAdmin)? adminMenu : userMenu) || ((user && user.isDoctor)?doctorMenu:userMenu)
  let sidebarMenu;
  if(user && user.isAdmin){
    sidebarMenu=adminMenu
  }
  else if(user && user.isDoctor){
    sidebarMenu=doctorMenu
  }
  else{
    sidebarMenu=userMenu
  }
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">DOC APP</div>
            <div className="menu">
              {sidebarMenu &&
                sidebarMenu.map((menu) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <>
                      <div className={`menu-item ${isActive && "active"}`}>
                        <i className={menu.icon}></i>
                        <Link to={menu.path}>{menu.name}</Link>
                      </div>
                    </>
                  );
                })}
                 <div className={`menu-item`} onClick={handleLogout}>
                    <i className="fa-solid fa-user"></i>
                    <Link to='/login'>Logout</Link>
                </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
              <Badge count={user && user.notification.length} onClick={()=>{Navigate('/notification')}}>
                <i className="fa-solid fa-bell" style={{cursor:"pointer"}}></i>
              </Badge>
                <Link to="/profile">{user && user.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
