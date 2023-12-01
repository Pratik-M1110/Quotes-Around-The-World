import { useState,useEffect } from "react";
import MyQuoteRow from "./MyquoteRow";
function Myquotes() {
    const UserId=sessionStorage.getItem("id");
    const [Myquotes, setMyquotes] = useState([]);

    useEffect(()=>{
        getUserQ();
    }, [])

    const getUserQ=()=>
    {
        debugger;
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.readyState == 4 &&
                helper.status == 200) {
                debugger;
                var result = JSON.parse(helper.responseText);
                    
                setMyquotes(result);
            }
        };
        helper.open("GET", `http://127.0.0.1:9999/quotes/${UserId}`);
        helper.send();
    }

    return (
        
            <table className='table table-bordered myTable'>
            <tbody>
                {
                    Myquotes.map((Myquote) => {
                            debugger;
                        {
                            return <MyQuoteRow
                                key={Myquote.id}
                                Myquote={Myquote}
                                 />;
                        }
                    })
                }
            </tbody>
        </table>
        
     );
}

export default Myquotes;