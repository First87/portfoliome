import { getUser,logout } from "../services/authorize";
// import {Link} from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import { withRouter } from "react-router-dom"
import Button from 'react-bootstrap/Button';
const NavbarComponent=({history})=>{

    return(
        <Nav class="navbar navbar-expand banner">
    <div class="container-fluid subbaner">
    <h1 class="navbar-brand" to="/">DevBotX </h1>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 textbar">
          <Nav.Item class="nav-item">
          <Nav.Link  class="nav-link"  href="/">Home</Nav.Link>
          </Nav.Item>
          
          <Nav.Item class="nav-item">
          <Nav.Link class="nav-link" href="/work">work</Nav.Link>
          </Nav.Item>
          {
            !getUser() && (
              <Nav.Item class="nav-item">
            <Nav.Link  class="nav-link"  href="/login">Login</Nav.Link>
          </Nav.Item>
            )
          }
          {getUser() && (
              <Nav.Item class="nav-item">
              <Nav.Link class="nav-link"  href="/create">Add Work</Nav.Link>
              </Nav.Item>
            )}
          {getUser() && (
              <Nav.Item class="nav-item">
            <Nav.Link  variant="link" onClick={()=>logout(()=>history.push("/"))} >Logout</Nav.Link>
          </Nav.Item>
            )}
          
        </ul>
        
      </div>
    </div>
  </Nav>
    )
}

export default withRouter(NavbarComponent);