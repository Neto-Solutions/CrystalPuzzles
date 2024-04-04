import React from "react"
import Checkin_header from "./components/Checkin_header"
import Registration_main from "./components/Registration_main"


function Registration_page() {
    return(
        <div className="registration_page_methodist">
            <Checkin_header/>
            <Registration_main/>
        </div>
    )
}

export default Registration_page