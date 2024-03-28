import React from "react"
import General_acc_panel from "./General_acc_panel"
import General_header from "./General_header"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
function Analytic_met() {
      return (
        <div className="notifications_met_main_cont">
            <General_acc_panel/>
            <div className="notifications_met_header_base_cont">
                <General_header/>
                <main className="notifications_met_base_cont">
                  <div className="notifications_met_cont">
                    <h2 className="notifications_met_header">
                      Уведомления
                    </h2>
                    <div className="notifications_met_item">
                      <div className="notifications_met_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_met_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_met_item">
                      <div className="notifications_met_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_met_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_met_item">
                      <div className="notifications_met_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_met_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_met_item">
                      <div className="notifications_met_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_met_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_met_item">
                      <div className="notifications_met_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_met_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_met_item">
                      <div className="notifications_met_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_met_open_link">Открыть </Link>
                    </div>
                    
                  </div>
                </main>
            </div>  
        </div>
      )
}

export default Analytic_met