import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginApi } from '../axios/usersAxios';
import { loginFunc } from '../redux/usersActions';


export const Login=()=>{

  const navigate = useNavigate();
  const [loginUser,setLoginUser]=useState()
  const myD=useDispatch()


  const login=(e)=>{
    e.preventDefault()
    loginApi({phoneNumber:loginUser.phoneNumber})
        .then((x)=>{myD(loginFunc("u",x.data));navigate('/order_processing')})
        .catch((error)=>{console.log(error.message)})
  }

 return <>
<h1>התחברות</h1>
<div className="tab-pane fade show active container d-flex justify-content-center align-items-center" id="pills_login" role="tabpanel" aria-labelledby="tab-login">
              
                <form onSubmit={e=>login(e)}>
                  
                <div  className="form-outline mb-4">
                  <input type="password" className="form-control" onChange={(x)=>setLoginUser({...loginUser,phoneNumber:x.target.value})} required/>
                  <label className="form-label" >הקש מספר טלפון להתחברות</label>
                </div>
                <input type="hidden"  value="loginForm"/>
                <button type="submit" className="btn btn-primary btn-block mb-4" > התחבר</button>
                <div className="text-center">
                  <p id="registerHelp">Not a member? <Link to="/my_registration"> Register</Link></p>
                </div>
              </form>
            </div>
 </>
}