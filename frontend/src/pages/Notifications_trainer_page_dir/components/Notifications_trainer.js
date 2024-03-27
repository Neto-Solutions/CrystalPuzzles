import React from "react"
import General_acc_panel from "./General_acc_panel"
import General_header from "./General_header"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
function Notifications_trainer() {
      return (
        <div className="notifications_trainer_main_cont">
            <General_acc_panel/>
            <div className="notifications_trainer_header_base_cont">
                <General_header/>
                <main className="notifications_trainer_base_cont">
                  <div className="notifications_trainer_cont">
                    <h2 className="notifications_trainer_header">
                      Уведомления
                    </h2>
                    <div className="notifications_trainer_item">
                      <div className="notifications_trainer_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_trainer_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_trainer_item">
                      <div className="notifications_trainer_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_trainer_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_trainer_item">
                      <div className="notifications_trainer_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_trainer_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_trainer_item">
                      <div className="notifications_trainer_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_trainer_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_trainer_item">
                      <div className="notifications_trainer_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_trainer_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_trainer_item">
                      <div className="notifications_trainer_description">
                        Михаил выполнил все задания
                      </div>
                      <Link className="notifications_trainer_open_link">Открыть </Link>
                    </div>
                    
                  </div>
                </main>
            </div>  
        </div>
      )
}

export default Notifications_trainer