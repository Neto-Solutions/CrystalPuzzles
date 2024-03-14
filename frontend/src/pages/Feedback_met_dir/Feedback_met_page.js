import React from "react"
import Checkin_header from "./components/Checkin_header"
import Feedback_met from "./components/Feedback_met"
import '../../css/feedback_page_methodist/Feedback_methodist_page.css';

function Feedback_met_page() {
    return(
        <div>
            <Checkin_header/>
            <Feedback_met/>
        </div>
    )
}

export default Feedback_met_page