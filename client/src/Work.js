import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import FooterComponent from "./components/FooterComponent";
import { getUser ,getToken } from "./services/authorize";

function Work() {
  const [blogs,setBlogs] = useState([])

  const fetchData=()=>{
      axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then(response=>{
          setBlogs(response.data)
      })
      .catch(err=>alert(err));
  }
  useEffect(()=>{
    fetchData()
  },[])

  const confirmDelete=(slug)=>{
    Swal.fire({
      title:"คุณต้องการลบงานหรือไม่?",
      icon:"warning",
      showCancelButton:true
      
    })
    .then((result)=>{
      if(result.isConfirmed){
       
        deleteBlog(slug)
          
        }
      
    
    })
  }
  const deleteBlog=(slug)=>{
    //ส่ง request ไปที่ api เพื่อลบข้อมุล
    axios
    .delete(`${process.env.REACT_APP_API}/blog/${slug}`,
    {
        headers:{
          authorization:`Bearer ${getToken()}`
      }
    })
    .then(response=>{
        Swal.fire("Deleted!",response.data.message,"success")
        fetchData()
    }).catch(err=>console.log(err))
    
  }
  return (
    <div className="container">
      <NavbarComponent/>
      <br />
      <div className="container">
        
      <h4>รายการสิ่งที่ต้องทำ</h4>
      </div>
      <br />
       {blogs.map((blog,index)=>(
        <div className="row  " key={index} style={{borderTop:'1px solid silver'}}>
          <div className="col pt-3 pb-2">
            <Link id="title1" to={`/blog/${blog.slug}`}>
            <h2>{blog.title}</h2>
            </Link>
         
            <div dangerouslySetInnerHTML={{ __html:(blog.content.substring(0,250))}}></div>
            <p className="text-muted"> ผู้เขียน: {blog.author} ,  เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
            { getUser() && (
              <div>
                <Link className="btn btn-dark" to={`/blog/edit/${blog.slug}`} >Edit</Link> &nbsp;
              <button className="btn btn-danger" onClick={()=>confirmDelete(blog.slug)}>Delete</button>
              </div>
            )}
          </div>
        </div>
       ))}
       <FooterComponent/>
    </div>
  );
}

export default Work;
