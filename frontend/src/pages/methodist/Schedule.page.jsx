import './Schedule.page.module.scss';
import PageContainer from '../../components/page.container/Page.container';
import left_arrow from '../../assets/svg/calendar_arrow_left.svg';
import right_arrow from '../../assets/svg/calendar_arrow_right.svg';
import calendar_icon from '../../assets/svg/calendar_icon.svg';

export default function SchedulePage() {
    return (
        <>
            <PageContainer.Header title="Расписание тренеров" />
            <PageContainer.Body>
                <div className="timetable_met_calendar">
                    <header className="timetable_met_calendar_head">
                        <img
                            src={left_arrow}
                            className="timetable_met_calendar_left_arrow"
                            alt=""
                        />
                        <h1 className="timetable_met_calendar_current_date">Май, 2022</h1>
                        <img
                            src={right_arrow}
                            className="timetable_met_calendar_left_arrow"
                            alt=""
                        />
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
                        <div className="timetable_met_calendar_range_dates">
                            02.10.23 - 08.10.23
                        </div>
                        <img
                            className="timetable_met_calendar_range_icon"
                            src={calendar_icon}
                            alt=""
                        />
                    </div>
                    <div className="timetable_met_make_shedule_cont">
                        <div className="timetable_met_make_shedule_descr">
                            Составить расписание
                        </div>
                    </div>
                </div>
            </PageContainer.Body>
        </>
    );
}
