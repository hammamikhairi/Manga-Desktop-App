import { useEffect, useState } from 'react';
import { IoNotificationsOutline, IoNotificationsSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import './navbar.sass';

const getPath = () => {
  return "/" + window.location.href.split("/").pop() || "/"
}

const Navbar = () => {

  // TODO : notifications system
  const [notif, setNotif] = useState(true)
  const [location, setLocation] = useState("/")

  useEffect(() => {
    document.getElementById("navbar").classList.remove("blurr")
    document.getElementById("bg")?.classList.remove("blurr")
  }, [])

  return (
    <div id="navbar" className="navbar-container"  >
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <h1 id="logo">Manelo</h1>
          </Link>
        </div>
        <ul className="links" onClick={() => {setLocation(getPath())}} >
          <Link to="/" ><li  className={ location == "/" ? 'highlighted' : '' } >Home</li></Link>
          <Link to="/mangas"><li className={ location == "/mangas" ? 'highlighted' : '' } >Mangas</li></Link>
          <Link to="/list" ><li className={ location == "/list" ? 'highlighted' : '' }> List</li></Link>
        </ul>
        <div className="notification-container">
          { notif ? <IoNotificationsSharp /> : <IoNotificationsOutline /> }
        </div>
      </div>
    </div>
  );
}

export default Navbar;