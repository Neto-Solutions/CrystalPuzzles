import React from "react"
import Checkin_header from "./components/Checkin_header"
import Effective_table_met from "./components/Effective_table_met"
import '../../css/effective_table_page_methodist/Effective_table_met_page.css';

function Effective_table_met_page() {
    return(
        <div className="effective_page_methodist">
            <Checkin_header/>
            <Effective_table_met/>
        </div>
    )
}

export default Effective_table_met_page