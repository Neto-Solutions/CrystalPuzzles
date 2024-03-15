import React from "react"

 
function Login_main() {
      return (
        <div className="login_main_container">
            <h1 className="login_main_container_header">
                Войти
            </h1>
            <form className="login_form">
                <label className="login_choose_your_speciality">
                    <p className="login_choose_your_speciality_description">Выберите вашу специальность</p>
                    <select className="login_speciality_select"></select>
                </label>
                <label className="login_email_input_cont">
                    <p className="login_email_input_description">Ваш e-mail</p>
                    <input className="login_email_input" type="text"/>
                </label >
                <label className="login_password_input_cont">
                    <p className="login_password_input_cont_description">Пароль</p>
                    <input className="login_password_input" type="password"/>
                    <a href="#" class="login_password_control"></a>
                </label>
                <div className="login_froget_pass_cont">
                    <a href="#" className="login_forget_pass">Забыли пароль?</a>
                </div>
                
                <label className="login_confidence_politic_cont">
                    <input className="login_confidence_politic_checkbox" type="checkbox"/>
                    <p className="login_confidence_politic_cont_descr">Подтверждая, вы соглашаетесь на обработку персональных 
                    данных и c <a className="login_confidence_politic_link" href="#">политикой конфиденциальности</a></p>
                </label>
                <div className="login_enter_btn_cont">
                    <button className="login_enter_btn">Войти</button>
                </div>
                <div className="login_acc_registr_link_cont">
                    <a href="#" className="login_acc_registr_link">Нет аккаунта?</a>
                </div>
                <div className="login_acc_registr_btn_cont">
                    <button className="login_acc_registr_btn">Зарегистрироваться</button>
                </div>
                
            </form>
        </div>
      )
}

export default Login_main