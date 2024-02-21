import React from "react"
import '../components_css/Login_main.css';
 
function Login_main() {
      return (
        <div className="main_container">
            <h1 className="main_container_header">
                Войти
            </h1>
            <form className="login_form">
                <label className="choose_your_speciality">
                    <p className="choose_your_speciality_description">Выберите вашу специальность</p>
                    <select className="speciality_select"></select>
                </label>
                <label className="email_input_cont">
                    <p className="email_input_description">Ваш e-mail</p>
                    <input className="email_input" type="text"/>
                </label >
                <label className="password_input_cont">
                    <p className="password_input_cont_description">Пароль</p>
                    <input className="password_input" type="password"/>
                </label>
                <div className="froget_pass_cont">
                    <a href="#" className="forget_pass">Забыли пароль?</a>
                </div>
                
                <label className="confidence_politic_cont">
                    <input className="confidence_politic_checkbox" type="checkbox"/>
                    <p className="confidence_politic_cont_descr">Подтверждая, вы соглашаетесь на обработку персональных 
                    данных и c <a className="confidence_politic_link" href="#">политикой конфиденциальности</a></p>
                </label>
                <div>
                    <button>Войти</button>
                </div>
                <div>
                    <a href="#">Нет аккаунта?</a>
                </div>
                <div>
                    <button>Зарегистрироваться</button>
                </div>
                
            </form>
        </div>
      )
}

export default Login_main