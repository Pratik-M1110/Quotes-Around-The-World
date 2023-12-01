function MyQuoteRow(props) {
    return ( <tr>
            <td>
                {props.Myquote.id}
            </td>
            <td>
                {props.Myquote.quote}
            </td>
        </tr> );
}

export default MyQuoteRow;