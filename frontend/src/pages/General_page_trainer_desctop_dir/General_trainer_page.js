import React from "react"
import Checkin_header from "./components/Checkin_header"
import General_trainer_main from "./components/General_trainer_main"
import '../../css/general_page_trainer/General_trainer_page.css';

function General_trainer_page() {
    return(
        <div className="genereal_page_methodist">
            <Checkin_header/>
            <General_trainer_main/>
        </div>
    )
}

export default General_trainer_page