import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../contexts/authContext';

function NavBar(){
  const [isConnected, setIsConnected] = useState(false);
  const {token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {

    if(token){
      setIsConnected(true);
    }

  }, [])


  const logout = (e) => {
    e.preventDefault();
    setToken(null)
    navigate('/login');
  }
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid ">
        <NavLink exact="true" to="/" className="navbar-brand">
          Brand
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/feed" className="nav-link">
                Feed
              </NavLink>
            </li>
            {!isConnected ?
            <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
            </li> : ''}
            
            {isConnected ? 
            <li className="nav-item">
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            </li>
            : ''}
            {isConnected ?  
            <li className="nav-item">
              <a onClick={logout} href='#' className="nav-link">
                Logout
              </a>
            </li> : ''}
           
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
