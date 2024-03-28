import React from "react"
import Checkin_header from "./components/Checkin_header"
import Make_timetable_met from "./components/Make_timetable_met"
import '../../css/make_timetable_page_methodist/Make_timetable_methodist_page.css';

function Make_timetable_met_page() {
    return(
        <div className="timetable_page_methodist">
            <Checkin_header/>
            <Make_timetable_met/>
        </div>
    )
}

export default Make_timetable_met_page