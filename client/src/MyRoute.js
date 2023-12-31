import {BrowserRouter , Switch,Route} from "react-router-dom"
import App from  "./App"
import FormComponent from "./components/FormComponent"
import SingleComponent from "./components/SingleComponent"
import EditComponent from "./components/EditComponent"
import LoginComponent from './components/LoginComponent'
import About from "./About"
import Work from "./Work"
import AdminRoute from "./AdminRoute"

const MyRoute=()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App}/>
                <AdminRoute path="/create" exact component={FormComponent}/>
                <Route path="/blog/:slug" exact component={SingleComponent}/>
                <AdminRoute path="/blog/edit/:slug" exact component={EditComponent}/>
                <Route path="/login" exact component={LoginComponent} />
                <Route path="/about" exact component={About} />
                <Route path="/work" exact component={Work} />
            </Switch>
        </BrowserRouter>
    )
}

export default MyRoute;