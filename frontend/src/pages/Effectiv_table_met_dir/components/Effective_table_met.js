import React from "react"
import General_acc_panel from "./General_acc_panel"
import General_header from "./General_header"

function Effective_table_met() {
      return (
        <div className="effective_table_met_main_cont">
            <General_acc_panel/>
            <div className="effective_table_met_header_base_cont">
                <General_header/>
                <main className="effective_table_met_base_cont">
                  <div className="effective_table_cont">
                    <div className="effective_table_first_column">
                      <div className="effective_table_first_column_part effective_table_head">
                        № п/п
                      </div>
                      <div className="effective_table_first_column_part">
                        1
                      </div>
                    </div>
                    <div className="effective_table_second_column">
                      <div className="effective_table_second_column_part  effective_table_head">
                        Показатели эффективности деятельности
                      </div>
                      <div className="effective_table_second_column_part">
                        Эффективность методического обеспечения образовательного процесса
                      </div>
                    </div>
                    <div className="effective_table_third_column">
                      <div className="effective_table_third_column_part effective_table_head">
                        Критерии оценки эффективности деятельности
                      </div>
                      <div className="effective_table_third_column_part">
                        Системность работы по совершенствованию программного обеспечения:
                        ведение баз данных по программному обеспечению
                      </div>
                      <div className="effective_table_third_column_part">
                        Подготовка образовательных программ к утверждению и лицензированию
                      </div>
                    </div>
                    <div className="effective_table_fourth_column">
                      <div className="effective_table_fourth_column_part effective_table_head">
                        Количественные, качественные или объѐмные показатели
                      </div>
                      <div className="effective_table_fourth_column_part">
                      Кол-во: 1-2 и более системность обновления Кол-во консультаций: до 10 
                      </div>
                      <div className="effective_table_fourth_column_part">
                      Кол-во: вновь разработанных 1-2 и более
                      </div>
                    </div>
                    <div className="effective_table_fifth_column">
                      <div className="effective_table_fifth_column_part effective_table_head">
                        Баллы
                      </div>
                      <div className="effective_table_fifth_column_part">
                        2
                      </div>
                      <div className="effective_table_fifth_column_part">
                        2
                      </div>
                    </div>
                    <div className="effective_table_sixth_column">
                      <div className="effective_table_sixth_column_part effective_table_head">
                        Примечание
                      </div>
                      <div className="effective_table_sixth_column_part">
                      Баллы суммируются
                      </div>
                  </div>
                  </div>
                  <div className="effective_table_download_btn_cont">
                    <button className="effective_table_download_btn">Выгрузить</button>
                  </div>
                  <div className="effective_table_google_doc_link_cont">
                    <button className="effective_table_google_doc_link">Открыть в Google doc</button>
                  </div>
                  
                </main>
            </div>  
        </div>
      )
}

export default Effective_table_met