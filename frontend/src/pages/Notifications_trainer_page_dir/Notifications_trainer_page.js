import React from "react"
import Checkin_header from "./components/Checkin_header"
import Notifications_trainer from "./components/Notifications_trainer"
import '../../css/notifications_page_trainer/Notifications_trainer_page.css';

function Notifications_trainer_page() {
    return(
        <div  className="notifications_page_trainer">
            <Checkin_header/>
            <Notifications_trainer/>
        </div>
    )
}

export default Notifications_trainer_page