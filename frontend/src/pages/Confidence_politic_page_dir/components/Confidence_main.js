import React from "react"
import {Link} from "react-router-dom";
 
function Confidence_main() {
      return (
        <div className="confident_main_container">
            <h1 className="confident_main_container_header">
            Политика Конфиденциальности 
            </h1>
            <form className="confident_form">
                <label className="confident_data_treatment_cont">
                    <input className="confident_data_treatment_checkbox" type="checkbox"/>
                    <p className="confident_data_treatment_descr">Согласие на обработку данных
                    данных</p>
                </label>
                <label className="confident_politic_cont">
                    <input className="confident_politic_checkbox" type="checkbox"/>
                    <p className="confident_politic_descr">Согласие с политикой компании </p>
                </label>
                <div className="confident_btn_cont">
                    <Link to="/" className="confident_btn">Подтвердить</Link>
                </div>
                
            </form>
        </div>
      )
}

export default Confidence_main