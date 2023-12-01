import { useEffect, useState } from 'react';
import './common.css';

function QuoteRow(props)
{
    // const HeartCheckbox = () => 
    //     const [checked, setChecked] = useState(false);
      
    //     const handleCheckboxChange = () => {
    //       setChecked(!checked);
    //     };
    // }



    return <tr>
                    <td>
                        {props.quote.id}
                    </td>
                    <td>
                        {props.quote.quote}
                    </td>
                    <td>
                        {props.quote.author}
                    </td>
                    <td>
                    <label className="heart-checkbox">
                    <input
                        type="checkbox"
                        // checked={checked}
                        // onChange={handleCheckboxChange}
                    />
                    <span className="heart" />
                    </label>
                    </td>
            </tr>

}
export default QuoteRow;