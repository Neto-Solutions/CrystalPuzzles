import React from "react"
import Checkin_header from "./components/Checkin_header"
import Shedule_prog_met from "./components/Shedule_prog_met"


function Shedule_prog_met_page() {
    return(
        <div className="shedule_prog_page_methodist">
            <Checkin_header/>
            <Shedule_prog_met/>
        </div>
    )
}

export default Shedule_prog_met_page