import axios from "axios";
import { useEffect, useState } from "react";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";
const SingleComponent=(props)=>{
    const [blog,setBlog] = useState('')

    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}blog/${props.match.params.slug}`)
        .then(response=>{
            setBlog(response.data)
         })
         .catch(err=>alert(err))
    },)
    return(
        <div className="container" >
            <NavbarComponent/>
            <br />
            <div className="container" style={{borderBottom:'1px solid silver'}}>
            <br />
            <h1>{blog.title}</h1>
            </div>
            <br />
            <div dangerouslySetInnerHTML={{ __html:(blog.content)}}></div>
            <p className="text-muted"> ผู้เขียน: {blog.author} ,  เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
            <FooterComponent/>
        </div>
    )
}

export default SingleComponent