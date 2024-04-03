import React from "react"
import General_acc_panel from "./General_acc_panel"
import General_header from "./General_header"
import '../../../css/cheklist_trainer_page/Checklist_trainer_page.css'


function ChecklistTrainer() {
      return (
        <div className="checklist_trainer_main_cont">
            <General_acc_panel/>
            <div className="checklist_trainer_header_base_cont">
                <General_header/>
                <main className="checklist_trainer_base_cont">
                  <section className="checklist_trainer_avatar_cont">
                    <img className="checklist_trainer_avatar" /> 
                  </section>
                  <section className="checklicst_trainer_levels_cont">
                    <div className="checklicst_trainer_level">Уровень:</div>
                    <div className="checklicst_trainer_area">Площадка:  <span className="checklicst_trainer_area_descpition">2- Бережковская набережная, д. 20, стр. 6</span></div>
                    <div className="checklicst_trainer_student">Ученик:</div>
                    <div className="checklicst_trainer_student">Ученик:</div>
                    <div className="checklicst_trainer_student">Ученик:</div>
                    <div className="checklicst_trainer_student">Ученик:</div>
                    <div className="checklicst_trainer_student">Ученик:</div>
                  </section>
                  <section className="checklicst_trainer_choose_panel">
                    <div className="checklicst_trainer_fullname">Дмитриева Анастасия Алексеевна</div>
                    <select className="checklicst_trainer_choose_student">
                      <option>Выберите учеников</option>
                    </select>
                    <select className="checklicst_trainer_choose_group">
                      <option>Выберите группу</option>
                    </select>
                    <select className="checklicst_trainer_choose_level">
                      <option>Выберите уровень</option>
                    </select>
                    <div className="checklicst_trainer_send_checklist">Отправить чек-лист</div>

                  </section>
                  <section className="checklist_trainer_exercises_cont">
                    <div className="checklist_trainer_exercises_head">Чек-лист</div>
                    <div className="checklist_trainer_exercise_cont"></div>
                    <div className="checklist_trainer_exercise_cont"></div>
                    <div className="checklist_trainer_exercise_cont"></div>
                    <div className="checklist_trainer_exercise_cont"></div>
                  </section>
                  
                  
                  
                </main>
            </div>  
        </div>
      )
}

export default ChecklistTrainer