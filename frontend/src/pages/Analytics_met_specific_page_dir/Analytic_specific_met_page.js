import React from "react"
import Checkin_header from "./components/Checkin_header"
import Analytic_met_specific from "./components/Analytic_met_specific"
import '../../css/analytic_page_specific_methodist/Analytic_methodist_specific_page.css';

function Analytic_specific_meth_page() {
    return(
        <div  className="analytic_page_specific_methodist">
            <Checkin_header/>
            <Analytic_met_specific/>
        </div>
    )
}

export default Analytic_specific_meth_page