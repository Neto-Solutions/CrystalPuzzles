import React from "react"

 
function Registration_main() {
      return (
        <div className="reg_main_container">
            <h1 className="reg_main_container_header">
            Зарегистрироваться
            </h1>
            <form className="reg_form">
                <label className="reg_fullname_input_cont">
                    <p className="reg_fullname_input_description">ФИО</p>
                    <input className="reg_fullname_input" type="text"/>
                </label >
                <label className="reg_choose_your_speciality">
                    <p className="reg_choose_your_speciality_description">Выберите вашу специальность</p>
                    <select className="reg_speciality_select"></select>
                </label>
                <label className="reg_email_input_cont">
                    <p className="reg_email_input_description">Ваш e-mail</p>
                    <input className="reg_email_input" type="text"/>
                </label >
                <label className="reg_password_input_cont">
                    <p className="reg_password_input_cont_description">Пароль</p>
                    <input className="reg_password_input" type="password"/>
                    <a href="#" class="reg_password_control"></a>
                </label>
                <label className="reg_confidence_politic_cont">
                    <input className="reg_confidence_politic_checkbox" type="checkbox"/>
                    <p className="reg_confidence_politic_cont_descr">Подтверждая, вы соглашаетесь на обработку персональных 
                    данных и c <a className="reg_confidence_politic_link" href="#">политикой конфиденциальности</a></p>
                </label>
                <div className="reg_acc_registr_btn_cont">
                    <button className="reg_acc_registr_btn">Зарегистрироваться</button>
                </div>
                
            </form>
        </div>
      )
}

export default Registration_main