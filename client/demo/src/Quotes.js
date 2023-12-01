import { useState ,useEffect} from "react";
import QuoteRow from "./QuoteRow";
import { useHistory } from "react-router-dom";

function Quotes() {

    const [quotes, setquotes] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        console.log("Inside COmponent Did Mount");
        selectQuotes();
    }, [])

    const selectQuotes = () => {
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = () => {
            if (helper.readyState == 4 && helper.status == 200) 
            {
                debugger;
                var result = JSON.parse(helper.responseText);
                var receivedQuotes = result;
                // console.log("Setting Emps to Array received from reqres.in website..");
                setquotes(receivedQuotes);
            }
        };
        helper.open("GET","http://127.0.0.1:9999/quotes");
        helper.send();
    }

    return (<center>
            <div>
            
            
                  <center> <h2>Quotes Around the World</h2></center>
            
            <table className='table table-bordered myTable'>
            <tbody>
            <tr>
            <th>Sr.No</th>
            <th>Quote</th>
            <th>Author</th>
            <th>fav</th>
            </tr>
                
                {
                    quotes.map((quote) => {
                            debugger;
                        {
                            return <QuoteRow
                                key={quote.id}
                                quote={quote}
                                getQuotes={selectQuotes}
                                 />;
                        }
                    })
                }
            </tbody>
        </table>
    </div>
    </center>);
}
export default Quotes;