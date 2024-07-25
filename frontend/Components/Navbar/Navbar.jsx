'use client'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoNotificationsOutline, IoNotificationsSharp } from 'react-icons/io5';



const Navbar = ({highlited}) => {

  // TODO : notifications system
  const [notif, setNotif] = useState(true)


  const router = useRouter()

  useEffect(() => {
    document.getElementById("navbar").classList.remove("blurr")
    document.getElementById("bg")?.classList.remove("blurr")
  }, [])

  return (
    <div id="navbar" className="navbar-container"  >
      <div className="navbar">
        <div className="logo">
          <div onClick={() => router.push("/")}  id="logo">
            Manelo
          </div>
        </div>
        <div className="links" >
          <p onClick={() => router.push("/")}  className={ highlited == "/" ? 'highlighted' : '' }>Home</p>
          <p onClick={() => router.push("/search")} className={ highlited == "/search" ? 'highlighted' : '' }>Search</p>
          <p onClick={() => router.push("/list")} className={ highlited == "/list" ? 'highlighted' : '' } > List</p>
        </div>
        <div className="notification-container">
          { !notif ? <IoNotificationsSharp /> : <IoNotificationsOutline /> }
        </div>
      </div>
    </div>
  );
}

export default Navbar;