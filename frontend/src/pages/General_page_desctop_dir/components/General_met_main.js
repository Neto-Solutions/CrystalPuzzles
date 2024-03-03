import React from "react"
import General_acc_panel from "./General_acc_panel"
import General_header from "./General_header"
import shedule_progress from "../../../svg/progress_shedule.svg"
import analitic from "../../../svg/analitic.svg"
function General_met_main() {
      return (
        <div className="general_met_main_cont">
            <General_acc_panel/>
            <div className="general_met_header_base_cont">
                <General_header/>
                <main className="general_met_base_cont">
                    <section className="general_met_progress_schedule_cont">
                        <h1 className="general_met_progress_shedule_head">
                            Графики прогресса
                        </h1>
                        <img className="general_met_progress_image" src={shedule_progress} />
                    </section>
                    <section className="general_met_analitic_cont">
                        <h1 className="general_met_analitic_head">
                            Аналитика
                        </h1>
                        <img src={analitic} />
                    </section>
                    <section className="general_met_table_cont">
                        <h1 className="general_met_table_head">Таблицы</h1>
                        <div className="general_met_table_part"></div>
                        <div className="general_met_table_part"></div>
                        <div className="general_met_table_part"></div>
                        <div className="general_met_table_part"></div>
                        <div className="general_met_table_part"></div>
                        <div className="general_met_table_part"></div>
                        <div className="general_met_table_part"></div>
                        <div className="general_met_table_part"></div>
                        <div className="general_met_table_part"></div>
                    </section>
                    <section className="general_met_notifications_cont">
                        <h1 className="general_met_notifications_head">Уведомления</h1>
                        <div className="general_met_notofication_cont">
                            <a href="#" className="general_met_notification_descr">Михаил выполнил все задания</a>
                            <button className="general_met_notification_btn">Открыть</button>
                        </div>
                        <div className="general_met_notofication_cont">
                            <a href="#" className="general_met_notification_descr">Методист Мария оставила вам сообщение</a>
                            <button className="general_met_notification_btn">Открыть</button>
                        </div>
                        <div className="general_met_notifications_btns_cont">
                            <button className="general_met_notifications_btns">Показать все</button>
                        </div>
                    </section>
                    <section className="general_met_schedule_chapter">
                        <div className="general_met_shedule_cont">
                        <h1 className="general_met_shedule_head">Расписание</h1>
                        <div className="general_met_shedule_item">
                            <p className="general_met_shedule_item_descr">17/10  площадка номер 1 14:00 - 5 группа, 
                                тренер Дмитриева А.
                            </p>
                        </div>
                        <div className="general_met_shedule_item">
                            <p className="general_met_shedule_item_descr">19/10  площадка номер 3 14:00 - 1 группа,
                                тренер Матвеева И.
                                </p>
                        </div>
                        <div className="general_met_shedule_item">
                            <p className="general_met_shedule_item_descr">21/10  площадка номер 1 14:00 - 3 группа,
                             тренер Ильина О.</p>
                        </div>
                        </div>
                        <div className="general_met_shedule_btns_cont">
                            <button className="general_met_shedule_btn trainer">Тренеры</button>
                            <button className="general_met_shedule_btn student">Ученики</button>
                        </div>
                    </section>
                </main>
            </div>  
        </div>
      )
}

export default General_met_main