import React from "react"
import General_acc_panel from "./General_acc_panel"
import General_header from "./General_header"
import left_arrow from "../../../svg/calendar_arrow_left.svg"
import right_arrow from "../../../svg/calendar_arrow_right.svg"
import calendar_icon from "../../../svg/calendar_icon.svg"


function Feedback_met() {
      return (
        <div className="feedback_met_main_cont">
            <General_acc_panel/>
            <div className="feedback_met_header_base_cont">
                <General_header/>
                <main className="feedback_met_base_cont">
                  <div className="feedback_commentary_area_cont">
                    <div className="feedback_comment_header">
                      Оставить комментарий методисту
                    </div>
                    <div className="feedback_commentary_place">
                    Антонина, поставь мне выходной на 30.10.2023, у меня прием у стоматолога.
                    </div>
                  </div>
                  <div className="feedback_commentary_send_btn_cont">
                    <button className="feedback_commentary_send_btn">Отправить</button>
                  </div>
                </main>
            </div>  
        </div>
      )
}

export default Feedback_met