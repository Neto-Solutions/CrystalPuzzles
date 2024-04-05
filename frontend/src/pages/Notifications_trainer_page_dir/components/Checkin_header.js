import React from "react"
import logo from "../../../svg/header_logo.svg"



function Checkin_header() {
      return (
        <header className="checkin_header">
          <div className="logo_container">
            <img src={logo}/>
          </div>
        </header>
      )
}

export default Checkin_header