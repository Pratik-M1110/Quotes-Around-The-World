import { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './common.css'
import { useHistory } from 'react-router-dom';
function Login(props) {

    const [credentials, setcredentials] = 
                useState({email: "", passwd:"",id:0,first_name:"",last_name:"",mobile:""});
    
    const [message, setmessage] = useState("");

    const history = useHistory(); 

    useEffect(()=>{
        if(message!="")
        {
            setTimeout(() => {
                setmessage("");
            }, 3000);
        }
    }, [message])

    const OnTextChange =(args)=>{
       var copyOfcredentials = {...credentials};
       copyOfcredentials[args.target.name] = 
                                args.target.value;
       setcredentials(copyOfcredentials);
    }

    const SignIn = ()=>{
        debugger;
        var helper = new XMLHttpRequest();

        helper.onreadystatechange=()=>{
            if(helper.readyState == 4 &&
                helper.status == 200)
                {
                    debugger;
                   var responseReceived = 
                    JSON.parse(helper.responseText);
                    if(responseReceived[0].email == credentials.email && 
                            responseReceived[0].passwd == credentials.passwd )
                    {
                        sessionStorage.setItem("isloggedin", true);
                        sessionStorage.setItem("email",credentials.email);
                        sessionStorage.setItem("id",responseReceived[0].id);
                        sessionStorage.setItem("first_name",responseReceived[0].first_name);
                        sessionStorage.setItem("last_name",responseReceived[0].last_name);
                        sessionStorage.setItem("mobile",responseReceived[0].mobile);
                        props.setEmail(credentials.email)
                        
                         history.push("/Quotes");
                        
                    }
                    else
                    {
                        setmessage("Credentials are invalid!");
                        setcredentials({email: "", password:""});
                    }
        }
    }
        helper.open("POST", "http://127.0.0.1:9999/login");

        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(credentials));
    }

    return (  <>
                <br/>
                <center>
                    <table className="table table-bordered table-hover loginTable">
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td>
                     <input type="text"
                        placeholder="Enter Email"
                        value={credentials.email} 
                        name='email'
                        onChange={OnTextChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td>
                            <input type="password"
                            placeholder="Enter Password" 
                            value={credentials.passwd}
                            name='passwd'
                            onChange={OnTextChange}
                            />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={"2"}>
                                   <button onClick={SignIn} className="btn btn-primary">
                                     Log In
                                   </button>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </center>
              </>);
}

export default Login;