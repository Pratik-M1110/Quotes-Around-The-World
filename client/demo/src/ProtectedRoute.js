import { Link,Switch, Route } from "react-router-dom";
import Login from "./login";

function ProtectedRoute(props)
{
    debugger;
    if(sessionStorage.getItem("isloggedin")!=null &&
    sessionStorage.getItem("isloggedin")=='true')
    {
        return <Route path={props.path} exact
        component={props.component}/>
    }
    else
    {
        return <Login setEmail={props.setEmail}/>
    }
}

export default ProtectedRoute;