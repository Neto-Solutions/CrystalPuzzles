import React from "react"
import Checkin_header from "./components/Checkin_header"
import Checklist_trainer from "./components/Checklist_trainer"
import '../../css/feedback_page_methodist/Feedback_methodist_page.css';

function CheckListTrainerPage() {
    return(
        <div className="feedback_page_methodist">
            <Checkin_header/>
            <Checklist_trainer/>
        </div>
    )
}

export default CheckListTrainerPage