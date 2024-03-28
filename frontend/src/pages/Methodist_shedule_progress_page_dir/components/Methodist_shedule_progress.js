import React from "react"
import General_acc_panel from "./General_acc_panel"
import General_header from "./General_header"
import {Link} from "react-router-dom";
import calendar_icon from "../../../svg/calendar_icon.svg"
import evolution_shedule from "../../../svg/evolution_shedule.svg"

function Methodist_shedule_progress() {
      return (
        <div className="shedule_progress_met_main_cont">
            <General_acc_panel/>
            <div className="shedule_progress_met_header_base_cont">
                <General_header/>
                <main className="shedule_progress_met_base_cont">
                  <div className="shedule_progress_met_evolution_shedule">
                    <img src={evolution_shedule}/>
                  </div>
                  <div className="shedule_progress_methodist_right_cont">
                    <div className="shedule_progress_met_part">
                      <div className="shedule_progress_met_photo"></div>
                      <div className="shedule_progress_met_descr">Дмитриева Анастасия Алексеевна</div>
                      <div className="shedule_progress_met_show_link">Показать</div>
                    </div>
                    <div className="shedule_progress_met_btns_cont">
                      <Link className="shedule_progress_met_btn analytic_specific_met_btn_calendar">
                        <span className="shedule_progress_met_date">02.10.23 - 08.10.23</span>
                        <img className="shedule_progress_met_icon" src={calendar_icon}/> 
                      </Link>
                      <Link className="shedule_progress_met_btn">Выгрузить</Link>
                      <Link className="shedule_progress_met_btn">Открыть в Google doc</Link>
                    </div>
                  </div>
                 
                </main>
            </div>  
        </div>
      )
}

export default Methodist_shedule_progress