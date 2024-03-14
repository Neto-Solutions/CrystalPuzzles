import React from "react"
import General_acc_panel from "./General_acc_panel"
import General_header from "./General_header"
import left_arrow from "../../../svg/calendar_arrow_left.svg"
import right_arrow from "../../../svg/calendar_arrow_right.svg"
import calendar_icon from "../../../svg/calendar_icon.svg"
function Shedule_prog_met() {
      return (
        <div className="timetable_met_main_cont">
            <General_acc_panel/>
            <div className="timetable_met_header_base_cont">
                <General_header/>
                <main className="timetable_met_base_cont">
                  <div className="timetable_met_calendar">
                    <header className="timetable_met_calendar_head">
                      <img src={left_arrow} className="timetable_met_calendar_left_arrow"></img>
                      <h1 className="timetable_met_calendar_current_date">Май, 2022</h1>
                      <img src={right_arrow} className="timetable_met_calendar_left_arrow"></img>
                    </header>
                    <div className="timetable_met_calendar_week_days_name_cont">
                      <div className="timetable_met_calendar_week_day_name">пн</div>
                      <div className="timetable_met_calendar_week_day_name">вт</div>
                      <div className="timetable_met_calendar_week_day_name">ср</div>
                      <div className="timetable_met_calendar_week_day_name">чт</div>
                      <div className="timetable_met_calendar_week_day_name">пт</div>
                      <div className="timetable_met_calendar_week_day_name">сб</div>
                      <div className="timetable_met_calendar_week_day_name">вс</div>
                    </div>
                    <div className="timetable_met_calendar_month_days_cont">
                      <div className="timetable_met_calendar_month_day">1</div>
                      <div className="timetable_met_calendar_month_day">2</div>
                      <div className="timetable_met_calendar_month_day">3</div>
                      <div className="timetable_met_calendar_month_day">4</div>
                      <div className="timetable_met_calendar_month_day">5</div>
                      <div className="timetable_met_calendar_month_day">6</div>
                      <div className="timetable_met_calendar_month_day">7</div>
                      <div className="timetable_met_calendar_month_day">8</div>
                      <div className="timetable_met_calendar_month_day">9</div>
                      <div className="timetable_met_calendar_month_day">10</div>
                      <div className="timetable_met_calendar_month_day">11</div>
                      <div className="timetable_met_calendar_month_day">12</div>
                      <div className="timetable_met_calendar_month_day">13</div>
                      <div className="timetable_met_calendar_month_day">14</div>
                    </div>
                    
                  </div>
                  <div className="timetable_met_btns_cont">
                    <div className="timetable_met_calendar_range_cont">
                      <div className="timetable_met_calendar_range_dates">02.10.23 - 08.10.23</div>
                      <img className="timetable_met_calendar_range_icon" src={calendar_icon}></img>
                    </div>
                    <div className="timetable_met_make_shedule_cont">
                      <div className="timetable_met_make_shedule_descr">Составить расписание</div>
                    </div>
                  </div>
                  
                </main>
            </div>  
        </div>
      )
}

export default Shedule_prog_met