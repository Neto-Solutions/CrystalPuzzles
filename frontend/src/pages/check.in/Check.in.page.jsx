import './Check.in.page.scss';
import { ReactComponent as Eye } from '@assets/svg/eye_icon.svg';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import User from '@entities/User';

export default function CheckInPage({ login = false }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const ref = useRef(null);

	async function handleSubmit() {
		dispatch({
			type: 'SET_USER',
			payload: new User({
				name: 'Антонина',
				avatar: 'avatar.png',
				role: ref.current.value
			})
		});
	}

	return (
		<>
			<div className="check_in_container">
				<h1 className="check_in_header">
					{login ? 'Войти' : 'Зарегистрироваться'}
				</h1>
				<form className="check_in_form">
					{!login && (
						<>
							<label className="input_container">
								<p className="input_description">ФИО</p>
								<input className="input" type="text" />
							</label>
						</>
					)}
					<label className="input_container">
						<p className="input_description">Выберите вашу специальность</p>
						<select ref={ref} className="input_select" defaultValue="student">
							<option className="input_option" value="kids">
								Ученик
							</option>
							<option className="input_option" value="trainer">
								Тренер
							</option>
							<option className="input_option" value="methodist">
								Методист
							</option>
						</select>
					</label>
					{!login && (
						<>
							<label className="input_container">
								<p className="input_description">Введите дату рождения</p>
								<input className="input" type="text" />
							</label>
							<label className="input_container">
								<p className="input_description">
									Введите номер вашей группы или имя тренера
								</p>
								<input className="input" type="text" />
							</label>
						</>
					)}

					<label className="input_container">
						<p className="input_description">Ваш e-mail</p>
						<input className="input" type="text" />
					</label>

					<label className="input_container">
						<p className="input_description">Пароль</p>
						<div className="input_password">
							<input className="input" type="password" />
							<Eye className="input_password_eye" />
						</div>
					</label>

					<div className="check_in_forget_password">
						<a href="/#" className="check_in_forget_password_link">
							Забыли пароль?
						</a>
					</div>

					<label className="input_container input_checkbox_container">
						<input className="input_checkbox" type="checkbox" />
						<p className="input_description">
							Подтверждая, вы соглашаетесь на обработку персональных данных и c
							<Link
								to="/confidence"
								className="check_in_confidence_politic_link"
							>
								политикой конфиденциальности
							</Link>
						</p>
					</label>
					<div className="check_in_submit_btn" onClick={() => handleSubmit()}>
						{login ? 'Войти' : 'Зарегистрироваться'}
					</div>
				</form>
				{login ? (
					<>
						<div className="check_in_btn_container">
							<a href="/#" className="check_in_btn_label">
								Нет аккаунта?
							</a>
							<div
								onClick={() => navigate('/registration')}
								className="check_in_btn"
							>
								Зарегистрироваться
							</div>
						</div>
					</>
				) : (
					<>
						<div className="check_in_btn_container">
							<label className="check_in_btn_label">Уже есть аккаунт?</label>
							<div onClick={() => navigate('/login')} className="check_in_btn">
								Войти
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}
