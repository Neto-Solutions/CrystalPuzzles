import styles from './Check.in.page.module.scss';
import { ReactComponent as Eye } from '@assets/svg/eye_icon.svg';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import User from '@entities/User';
import { useEffect } from 'react';
import Button from '@components/button/Button'
export default function CheckInPage({ login = false }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const ref = useRef(null);

	async function handleSubmit() {
		dispatch(
			setUser(
				new User({
					name: 'Антонина',
					avatar: ref.current.value + '.png',
					role: ref.current.value
				})
			)
		);
	}

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.header}>
					{login ? 'Войти' : 'Зарегистрироваться'}
				</h1>
				<form className={styles.form}>
					{!login && (
						<>
							<label className={styles.input_container}>
								<p className={styles.input_description}>ФИО</p>
								<input className={styles.input} type="text" />
							</label>
						</>
					)}
					<label className={styles.input_container}>
						<p className={styles.input_description}>Выберите вашу специальность</p>
						<select className={styles.input_select} defaultValue="student">
							<option className={styles.input_option} value="student">
								Ученик
							</option>
							<option className={styles.input_option} value="trainer">
								Тренер
							</option>
							<option className="input_option" value="methodist">
								Методист
							</option>
						</select>
					</label>
					{!login && (
						<>
							<label className={styles.input_container}>
								<p className={styles.input_description}>Введите дату рождения</p>
								<input className={styles.input} type="text" />
							</label>
							<label className={styles.input_container}>
								<p className={styles.input_description}>
									Введите номер вашей группы или имя тренера
								</p>
								<input className={styles.input} type="text" />
							</label>
						</>
					)}

					<label className={styles.input_container}>
						<p className={styles.input_description}>Ваш e-mail</p>
						<input className={styles.input} type="text" />
					</label>

					<label className={styles.input_container}>
						<p className={styles.input_description}>Пароль</p>
						<div className={styles.input_password}>
							<input className={styles.input} type="password" />
							<Eye className={styles.input_password_eye} />
						</div>
					</label>

					<div className={styles.forget_password}>
						<a href="/#" className={styles.forget_password_link}>
							Забыли пароль?
						</a>
					</div>

					<label className={styles.input_checkbox_container}>
						<p className={styles.input_description}>
							Подтверждая, вы соглашаетесь на обработку персональных данных и c
							<Link
								to="/confidence"
								className={styles.confidence_politic_link}
							>
								политикой конфиденциальности
							</Link>
						</p>
						<input className={styles.input_checkbox} type="checkbox" />
					</label>
					<Button className={styles.submit_btn} onClick={() => handleSubmit()}>
						{login ? 'Войти' : 'Зарегистрироваться'}
					</Button>
				</form>
				{login ? (
					<>
						<div className={styles.btn_container}>
							<Button onClick={() => navigate('/registration')} className={styles.btn}>
								Зарегистрироваться
							</Button>
							<a href="/#" className={styles.btn_label}>
								Нет аккаунта?
							</a>

						</div>
					</>
				) : (
					<>
						<div className={styles.btn_container}>
							<label className={styles.btn_label}>Уже есть аккаунт?</label>
							<Button onClick={() => navigate('/login')} className={styles.btn}>
								Войти
							</Button>
						</div>
					</>
				)}
			</div>
		</>
	);
}
