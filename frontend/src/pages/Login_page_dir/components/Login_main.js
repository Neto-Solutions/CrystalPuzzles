import React from "react";
import {Link} from "react-router-dom";
 
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
                    данных и c <Link to="/confidence" className="login_confidence_politic_link" >политикой конфиденциальности</Link></p>
                </label>
                <div className="login_enter_btn_cont">
                    <Link to="/" className="login_enter_btn">Войти</Link>
                </div>
                <div className="login_acc_registr_link_cont">
                     <Link to="/registration" className="login_acc_registr_link">Нет аккаунта?</Link>
                </div>
                <div className="login_acc_registr_btn_cont">
                    <Link to="/registration" className="login_acc_registr_btn">Зарегистрироваться</Link>
                </div>
                
            </form>
        </div>
      )
}

export default Login_main