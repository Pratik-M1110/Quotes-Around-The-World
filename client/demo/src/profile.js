import { useState,useEffect } from "react";
function MyProfile() {
  
    const id=sessionStorage.getItem("id");

    const [profile, setProfile] = 
                useState({id:0,first_name:"",last_name:"",email:"",passwd:"",mobile:""});
    
    
    useEffect(()=>{
      Getprofile();
    }, [])

    const Getprofile=()=>
    {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.readyState == 4 &&
                helper.status == 200) {
                debugger;
                var result = JSON.parse(helper.responseText);
                var receivedUser=result;
                // console.log(receivedUser);
                setProfile({id:receivedUser[0].id,
                    first_name:receivedUser[0].first_name,
                    last_name:receivedUser[0].last_name,
                    email:receivedUser[0].email,
                    passwd:receivedUser[0].passwd,
                    mobile:receivedUser[0].mobile
                });  
            }
        };
        helper.open("GET", `http://127.0.0.1:9999/users/${id}`);
        helper.send();
    }

    const onTextChange=(args)=>
    {
        var copy = {...profile}
        copy[args.target.name] = args.target.value;
        setProfile(copy);
    }

    const updateProfile=()=>{
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.readyState == 4 &&
                helper.status == 200) {
                debugger;
                var result = JSON.parse(helper.responseText);
                if(result.affectedRows!=undefined && result.affectedRows>0)
                {
                    setProfile({id:0,
                        first_name:"",
                        last_name:"",
                        email:"",
                        passwd:"",
                        mobile:""
                    });  
                }
                // console.log(receivedUser);
                  
            }
        };
        helper.open("PUT", `http://127.0.0.1:9999/users/${id}`);
        helper.setRequestHeader("Content-Type", "application/json")
        helper.send(JSON.stringify(profile));
    }

    return(<div className="mytable">

    <div className="form-group">
    <input type="text"
            className="form-control" 
            name="id"
            placeholder="Enter id"
            value={profile.id}
            onChange={onTextChange}/>
    </div>

    <div className="form-group">
    <input type="text" 
            className="form-control"
            name="first_name"
            placeholder="first_name"
            value={profile.first_name}
            onChange={onTextChange}/>
    </div>

    <div className="form-group">
    <input type="text" 
            className="form-control"
            name="last_name"
            placeholder="Enter last_name"
            value={profile.last_name}
            onChange={onTextChange}/>
    </div>

    <div className="form-group">
    <input type="text" 
            className="form-control"
            name="email"
            placeholder="Enter email"
            value={profile.email}
            onChange={onTextChange}/>
    </div>

    <div className="form-group">
    <input type="text" 
            className="form-control"
            name="passwd"
            placeholder="Enter password"
            value={profile.passwd}
            onChange={onTextChange}/>
    </div>

    <div className="form-group">
    <input type="text" 
            className="form-control"
            name="mobile"
            placeholder="Enter mobile"
            value={profile.mobile}
            onChange={onTextChange}/>
    </div>
    

    <button style={{margin:5}} onClick={updateProfile} className="btn btn-info">
        Update
    </button>
</div>)
}

 export default MyProfile;