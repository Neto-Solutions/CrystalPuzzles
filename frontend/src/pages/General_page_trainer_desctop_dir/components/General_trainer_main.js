import React from "react";
import General_acc_panel from "./General_acc_panel";
import General_header from "./General_header";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


function General_trainer_main() {
      return (
        <div className="general_trainer_main_cont">
            <General_acc_panel/>
            <div className="general_trainer_header_base_cont">
                <General_header/>
                <main className="general_trainer_base_cont">
                    <section className="general_trainer_notifications_cont">
                        <h1 className="general_trainer_notifications_head">Уведомления</h1>
                        <div className="general_trainer_notification_cont">
                            <a href="#" className="general_trainer_notification_descr">Михаил выполнил все задания</a>
                            <button className="general_trainer_notification_btn">Открыть</button>
                        </div>
                        <div className="general_trainer_not_decor_line"></div>
                        <div className="general_trainer_notification_cont">
                            <a href="#" className="general_trainer_notification_descr">Методист Мария оставила вам сообщение</a>
                            <button className="general_trainer_notification_btn">Открыть</button>
                        </div>
                        <div className="general_trainer_not_decor_line"></div>
                        <div className="general_trainer_notifications_btns_cont">
                            <button className="general_trainer_notifications_btns">Показать все</button>
                        </div>
                    </section>
                    <Link to="/timetable_methodist" className="general_trainer_timetable_cont_route">
                        <section className="general_trainer_timetable_chapter">
                            <div className="general_trainer_timetable_cont">
                                <h1 className="general_trainer_timetable_head">Расписание</h1>
                                <div className="general_trainer_timetable_item">
                                    <p className="general_trainer_timetable_item_descr"><span className="gen_timetable_diff_color">17/10</span>  площадка номер 1 
                                    <span className="gen_timetable_diff_color">14:00</span> - 5 группа</p>
                                </div>
                                <div className="general_trainer_timetable_decor_line"></div>
                                <div className="general_trainer_timetable_item">
                                    <p className="general_trainer_timetable_item_descr"><span className="gen_timetable_diff_color">
                                        19/10</span> площадка номер 3 <span className="gen_timetable_diff_color">14:00</span> - 1 группа
                                    </p>
                                </div>
                                <div className="general_trainer_timetable_decor_line"></div>
                                <div className="general_trainer_timetable_item">
                                    <p className="general_trainer_timetable_item_descr"><span className="gen_timetable_diff_color">21/10</span>  площадка номер 1 <span className="gen_timetable_diff_color">
                                        14:00</span> - 3 группа
                                    </p>
                                </div>

                            </div>
                            <div className="general_trainer_timetable_btns_cont">
                                <button className="general_trainer_timetable_btn ">Сформировать чек-лист</button>
                            </div>
                        </section>

                    </Link>
                    <Link to="/" className="general_trainer_checklist_cont_route">
                        <section className="general_trainer_checklist_cont">
                                <h1 className="general_trainer_checklist_head">Чек-листы</h1>
                                <div className="general_trainer_checklist_item">
                                    <span  className="general_trainer_checklist_text">1 уровень </span>
                                    <input className="general_trainer_checklist_checkbox" type="checkbox"></input>
                                </div>
                                <div className="general_trainer_checklist_item">
                                    <span className="general_trainer_checklist_text">1 уровень </span>
                                    <input className="general_trainer_checklist_checkbox" type="checkbox"></input>
                                </div>
                                <div className="general_trainer_checklist_item">
                                    <span className="general_trainer_checklist_text">1 уровень </span>
                                    <input className="general_trainer_checklist_checkbox" type="checkbox"></input>
                                </div>
                                <div className="general_trainer_checklist_item">
                                    <span className="general_trainer_checklist_text">1 уровень </span>
                                    <input className="general_trainer_checklist_checkbox" type="checkbox"></input>
                                </div>
                                <div className="general_trainer_checklist_item">
                                    <span className="general_trainer_checklist_text">1 уровень </span>
                                    <input className="general_trainer_checklist_checkbox" type="checkbox"></input>
                                </div>
                        </section>

                    </Link>
                    
                </main>
            </div>  
        </div>
      )
}

export default General_trainer_main