import { useHistory } from "react-router-dom";

function Auth()
{
    const history = useHistory();
    const SignOut = (setEmail)=>{
        debugger;
        sessionStorage.removeItem("isloggedin");
        sessionStorage.removeItem("email");
        setEmail("");
        history.push("/login")
        }
    
    const SignIn = ()=>{
        debugger;
            history.push("/topics")
    }

    return {SignIn, SignOut}
}

export default Auth;

