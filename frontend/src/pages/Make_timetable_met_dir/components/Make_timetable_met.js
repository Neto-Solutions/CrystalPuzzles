import React from "react"
import General_acc_panel from "./General_acc_panel"
import General_header from "./General_header"
import left_arrow from "../../../svg/calendar_arrow_left.svg"
import right_arrow from "../../../svg/calendar_arrow_right.svg"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

function Make_timetable_met() {
      return (
        <div className="make_timetable_met_main_cont">
            <General_acc_panel/>
            <div className="make_timetable_met_header_base_cont">
                <General_header/>
                <main className="make_timetable_met_base_cont">
                  <div className="make_timetable_met_calendar">
                    <header className="make_timetable_met_calendar_head">
                      <img src={left_arrow} className="make_timetable_met_calendar_left_arrow"></img>
                      <h1 className="make_timetable_met_calendar_current_date">Май, 2022</h1>
                      <img src={right_arrow} className="make_timetable_met_calendar_left_arrow"></img>
                    </header>
                    <div className="make_timetable_met_calendar_week_days_name_cont">
                      <div className="make_timetable_met_calendar_week_day_name">пн</div>
                      <div className="make_timetable_met_calendar_week_day_name">вт</div>
                      <div className="make_timetable_met_calendar_week_day_name">ср</div>
                      <div className="make_timetable_met_calendar_week_day_name">чт</div>
                      <div className="make_timetable_met_calendar_week_day_name">пт</div>
                      <div className="make_timetable_met_calendar_week_day_name">сб</div>
                      <div className="make_timetable_met_calendar_week_day_name">вс</div>
                    </div>
                    <div className="make_timetable_met_calendar_month_days_cont">
                      <div className="make_timetable_met_calendar_month_day">1</div>
                      <div className="make_timetable_met_calendar_month_day">2</div>
                      <div className="make_timetable_met_calendar_month_day">3</div>
                      <div className="make_timetable_met_calendar_month_day">4</div>
                      <div className="make_timetable_met_calendar_month_day">5</div>
                      <div className="make_timetable_met_calendar_month_day">6</div>
                      <div className="make_timetable_met_calendar_month_day">7</div>
                      <div className="make_timetable_met_calendar_month_day">8</div>
                      <div className="make_timetable_met_calendar_month_day">9</div>
                      <div className="make_timetable_met_calendar_month_day">10</div>
                      <div className="make_timetable_met_calendar_month_day">11</div>
                      <div className="make_timetable_met_calendar_month_day">12</div>
                      <div className="make_timetable_met_calendar_month_day">13</div>
                      <div className="make_timetable_met_calendar_month_day">14</div>
                    </div>
                    
                  </div>
                    <div className="make_timetable_met_choose_trainer_cont">
                      <select className="make_timetable_met_choose_trainer">
                       <option> Выберите тренера</option>
                      </select>
                      <select className="make_timetable_met_choose_place">
                        <option>Выберите площадку</option>
                      </select>
                      <div className="make_timetable_met_send_shedule_cont">
                        <Link className="make_timetable_met_send_shedule_link">Отправить расписание</Link>
                      </div>
                    </div>
                  
                </main>
            </div>  
        </div>
      )
}

export default Make_timetable_met