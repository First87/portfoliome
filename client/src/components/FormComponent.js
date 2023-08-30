import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import FooterComponent from "./FooterComponent";
import { getUser,getToken } from "../services/authorize";
const FromComponent=()=>{
    const [state,setState] = useState({
        title:"",
       
        author:getUser()
    })
    const {title,author} = state
    const [content,setContent] = useState('')
    const inputValue=name=>event=>{
        
        setState({...state,[name]:event.target.value});
    }
    const submitContent=(event)=>{
        setContent(event)
    }
    const submitForm=(e)=>{
        e.preventDefault();
       
        console.log("API URL = ",process.env.REACT_APP_API)
        axios
        .post(`${process.env.REACT_APP_API}/create`,
        {title,content,author},
        {
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        }
        )
        
        .then(response=>{
           
            Swal.fire(
                'แจ้งเตือน',
                "บันทึกข้อมูลเรียบร้อย",
                'success'
              )
              setState({...state,title:"",author:""})
              setContent("")
        })
        .catch(err=>{
           
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
              )
        })
    }
    return (
        <div className="container">
            <NavbarComponent/>
            <br />
            <h1>เพิ่มงาน</h1>
        
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>
                        ชื่องาน
                    </label>
                    <input type="text" className="form-control" value={title} onChange={inputValue("title")}/>
                </div>
                <div className="form-group">
                    <label>
                       รายละเอียดงาน
                    </label>
                    <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="เขียนรายงานละเอียดบทความของคุณ"
                        style={{border:'1px solid #666'}}
                    />
                    
                </div>
                <div className="form-group">
                    <label>
                       ผู้แต่ง
                    </label>
                    <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
                </div>
                <br></br>
                <input type="submit" value="บันทึก" className="btn btn-primary"/>
               
            </form>
            <FooterComponent/>
        </div>
      );
}
export default FromComponent;