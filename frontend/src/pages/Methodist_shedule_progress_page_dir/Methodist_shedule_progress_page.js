import React from "react"
import Checkin_header from "./components/Checkin_header"
import Methodist_shedule_progress from "./components/Methodist_shedule_progress.js"
import '../../css/methodist_shedule_progress_page/Methodist_progress_shedule.css';

function Methodist_shedule_progress_page() {
    return(
        <div className="analytic_page_specific_methodist">
            <Checkin_header/>
            <Methodist_shedule_progress/>
        </div>
    )
}

export default Methodist_shedule_progress_page