import React from "react"
import General_acc_panel from "./General_acc_panel"
import General_header from "./General_header"
import {Link} from "react-router-dom";
import calendar_icon from "../../../svg/calendar_icon.svg"
function Analytic_met_specific() {
      return (
        <div className="analytic_specific_met_main_cont">
            <General_acc_panel/>
            <div className="analytic_specific_met_header_base_cont">
                <General_header/>
                <main className="analytic_specific_met_base_cont">
                  <div className="analytic_specific_met_part">
                    <div className="analytic_specific_met_photo"></div>
                    <div className="analytic_specific_met_descr">Дмитриева Анастасия Алексеевна</div>
                    <div className="analytic_specific_met_show_link">Показать</div>
                  </div>
                  <div className="analytic_specific_met_trainer_comment">
                    <span className="trainer_comment">Комментарий тренера</span>
                  </div>
                  <div className="analytic_specific_met_btns_cont">
                    <Link className="analytic_specific_met_btn analytic_specific_met_btn_calendar">
                      <span className="analytic_specific_met_date">02.10.23 - 08.10.23</span>
                      <img className="analytic_specific_met_icon" src={calendar_icon}/> 
                    </Link>
                    <Link className="analytic_specific_met_btn">Выгрузить</Link>
                    <Link className="analytic_specific_met_btn">Открыть в Google doc</Link>
                  </div>
                </main>
            </div>  
        </div>
      )
}

export default Analytic_met_specific