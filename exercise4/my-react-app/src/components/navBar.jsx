import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const NavBar=()=>{
    
    const navigate = useNavigate();

    const token =  JSON.parse(localStorage.getItem("user"))?._id || null; 
    return<>
        
    <nav className="navbar navbar-expand-lg navbar-light bg-light m-2">
            <div className="container-fluid">
                <Link to="/" className="text-dark fw-bold display-4 text-center d-block text-decoration-none "  style={{ fontSize: "xx-large" }}><i className="bi bi-shop-window"></i> המכולת</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScrollnew" aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScrollnew">
                    <ul className="navbar-nav me-auto my-2 my-lg-0">
                      {!token && <li className="nav-item"> 
                        <Link to='/products_list'  className="nav-link" >צפיה במוצרים</Link>
                        </li>}
                    {!token &&  <li className="nav-item"> 
                            <Link to="/order_list" className="nav-link" >צפיה הזמנות</Link>
                        </li>}
                       {token && <li className="nav-item"> 
                            <Link to={'/order_processing'} className="nav-link" > הזמנות ספק </Link>
                        </li>}

                       {!token && <li className="nav-item"> 
                            <Link to={'/make_order'} className="nav-link" >הופסת הזמנה </Link>
                        </li>}
                        <li className="nav-item"> 
                            <Link to={'/my_login'} className="nav-link" >התחברות </Link>
                        </li>
                        <li className="nav-item"> 
                            <Link  to={'/my_registration'} className="nav-link" >הרשמה </Link>
                        </li>
                      
                       
                    </ul>
                   
                </div>
            </div>
        </nav>

        
    </>
}