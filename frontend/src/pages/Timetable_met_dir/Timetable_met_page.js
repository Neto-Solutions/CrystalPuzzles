import React from "react"
import Checkin_header from "./components/Checkin_header"
import Timetable_met from "./components/Timetable_met"
import '../../css/timetable_page_methodist/Timetable_methodist_page.css';

function Timetable_met_page() {
    return(
        <div className="timetable_page_methodist">
            <Checkin_header/>
            <Timetable_met/>
        </div>
    )
}

export default Timetable_met_page