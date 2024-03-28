import React from "react"
import Checkin_header from "./components/Checkin_header"
import General_met_main from "./components/General_met_main"
import '../../css/general_page_methodist/General_methodist_page.css';

function General_methodist_page() {
    return(
        <div className="genereal_page_methodist">
            <Checkin_header/>
            <General_met_main/>
        </div>
    )
}

export default General_methodist_page