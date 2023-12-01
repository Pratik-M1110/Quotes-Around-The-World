import { Link,Switch, Route } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import Auth from "./NavigateToFromLogin";
import Quotes from "./Quotes";
import Profile from "./profile";
import Myquotes from "./Myquotes";

function  Launch()
{
      debugger;
      const [email, setEmail] = useState("")
      const history = useHistory(); 
      const {SignIn, SignOut} = Auth();
      const [message, setmessage] = useState("");
   
      useEffect(()=>{
      if(sessionStorage.getItem("email")!=null)
      {
            setEmail(sessionStorage.getItem("email"));
      }
      else
      {
            setEmail("");
      }
      }, []);

   useEffect(()=>{
      if(message!="")
      {
          setTimeout(() => {
              setmessage("");
          }, 3000);
      }
  }, [message])
  
   const ShowButton =()=>{
      if(email == "")
      {
            return  <button className='btn btn-warning' onClick={SignIn}>Log In</button>
      }
      else
      {
            return  <button className='btn btn-warning' onClick={()=>{SignOut(setEmail)}}>Log out</button>
      }
   }       
   
    return <>
                <Header></Header>
                 <hr></hr>
                  <div style={{paddingLeft: 50}}>
                  Welcome {"  "} {email}
                  {ShowButton()}
                  </div>
                  <hr></hr>   
                 {"   |   "}
                 <Link to="/Quotes">Home</Link> 
                 
                 {"   |   "}
                 <Link to="/Myquotes">MyQuotes</Link> 
                 
                 {"   |   "}
                 <Link to="/profile">Profile</Link> 
                 {"   |   "}
                 <hr></hr>
                   <Switch>
                         <ProtectedRoute path="/Quotes"
                               component={Quotes}setEmail={setEmail}/>
                         <ProtectedRoute path="/Home"
                               component={Quotes}setEmail={setEmail}/>
                         <ProtectedRoute path="/Myquotes"
                               component={Myquotes} setEmail={setEmail}/>
                         <ProtectedRoute path="/profile" 
                               component={Profile} setEmail={setEmail}/>           
                         <ProtectedRoute path="*" 
                               component={Quotes} setEmail={setEmail}/>    
                   </Switch>
                 <hr></hr>
                <Footer></Footer>
            </>
}
export default Launch;