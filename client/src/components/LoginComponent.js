import NavbarComponent from "./NavbarComponent";
import { useState,useEffect } from "react";
import FooterComponent from "./FooterComponent";
import axios from "axios"
import Swal from "sweetalert2";
import { authenticate } from "../services/authorize";
import { withRouter } from "react-router-dom"
import { getUser } from "../services/authorize";
const LoginComponent=(props)=>{
    const [state,setState] = useState({
        username:"",
       
        password:""
    })
    const {username,password} = state
    const inputValue=name=>event=>{
        
        setState({...state,[name]:event.target.value});
    }

    const submitForm=(e)=>{
        e.preventDefault();
        axios
        .post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
            // login สำเร็จ
            authenticate(response,()=>props.history.push("/create"))
        }).catch(err=>{
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
              )
        })
            
    }
    useEffect(()=>{
        getUser() && props.history.push("/")
        // eslint-disable-next-line
    },[])
    return(
        <div className="container">
            <NavbarComponent/>
            <br />
            <h1>เข้าสู่ระบบ | Admin</h1>
           
            
<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  คลิกเพื่อเข้าสู่ระบบ
</button>

<div class="offcanvas offcanvas-start bg-light" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
<div className="container-sm">
    <div className="d-flex justify-content-center p-5">
    <h1>LOGIN</h1>
    </div>
<form onSubmit={submitForm}>
                <div className="form-group">
                    <label>
                        Username
                    </label>
                    <input type="text" className="form-control" value={username} onChange={inputValue("username")}/>
                </div>
                
                <div className="form-group">
                    <label>
                       Password
                    </label>
                    <input type="password" className="form-control" value={password} onChange={inputValue("password")}/>
                </div>
                <br></br>
                <div className="d-flex justify-content-center">
                <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary"/>
                </div>
                
               
            </form>
</div>
</div>
            
            <FooterComponent/>
        </div>
    )
}
export default withRouter(LoginComponent)