import React from "react"
import Checkin_header from "./components/Checkin_header"
import Notifications_met from "./components/Notifications_met"
import '../../css/notifications_page_methodist/Notifications_methodist_page.css';

function Notifications_met_page() {
    return(
        <div  className="analytic_page_methodist">
            <Checkin_header/>
            <Notifications_met/>
        </div>
    )
}

export default Notifications_met_page