import React from "react"
import avatar from "../../../svg/avatar.svg"
import help from "../../../svg/help_icon.svg"
import exit from "../../../svg/exit_icon.svg"
import {Link} from "react-router-dom";

function General_acc_info() {
      return (
           <aside className="general_met_aside">
                <div className="general_met_acc_info_cont">
                    <img src={avatar} className="general_met_acc_img"/>
                    <div className="general_met_acc_info_descr">
                        <span className="general_met_acc_prof">методист</span>
                        <span className="general_met_acc_name">Антонина</span>
                    </div>      
                </div>
                <div className="general_met_acc_decor_line"></div>
                <nav className="general_met_nav">
                    <select className="general_met_nav_options">
                        <option className="general_met_nav_item" selected>главная</option>
                    </select>
                </nav>
                <div className="general_met_acc_decor_line"></div>
                <div className="general_met_acc_links">
                    <Link to="/login" className="general_met_help_cont">
                        <img src={help} className="general_met_help_icon"/>
                        <span className="general_met_help_link">Помощь</span>
                    </Link>
                    <Link to="/login" className="general_met_exit_cont">
                        <img src={exit} className="general_met_exit_icon"/>
                        <span className="general_met_exit_link">Выйти</span>
                    </Link>
                </div>
            </aside>
      )
}

export default General_acc_info