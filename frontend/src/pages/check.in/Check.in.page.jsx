import styles from './Check.in.page.module.scss';
import { ReactComponent as Eye } from '@assets/svg/eye_icon.svg';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import User from '@entities/User';
import { setUser } from '@entities/User/slice';
import Button from '@components/button/Button';
import { registerUser } from '../../api/users.api';
import { authUser } from '../../api/auth.api';
import { getProfile } from '../../api/profile.api';

export default function CheckInPage({ login = false }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleSubmit(e) {
		e.preventDefault();
		const data = {};

		for (let i = 0; i < e.target.length; i++) {
			let key = e.target[i].getAttribute('data-key');
			if (key) {
				data[key] = e.target[i].value;
			}
		}
		let userInfo = new Promise((resolve, reject) => {
			if (login) {
				authUser(data)
					.then(() =>
						getProfile()
							.then((res) => resolve(res))
							.catch((err) => reject(err))
					)
					.catch((err) => reject(err));
			} else {
				registerUser(data)
					.then(() =>
						authUser({
							username: data.email,
							password: data.password
						})
					)
					.then(() => getProfile())
					.then((res) => resolve(res))
					.catch((err) => reject(err));
			}
		});
		userInfo.then((res) => {
			dispatch(setUser(new User(res)));
		});
	}
	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.header}>
					{login ? 'Войти' : 'Зарегистрироваться'}
				</h1>
				<form onSubmit={handleSubmit} className={styles.form}>
					{!login && (
						<>
							<label className={styles.input_container}>
								<p className={styles.input_description}>ФИО</p>
								<input className={styles.input} data-key="name" type="text" />
							</label>
						</>
					)}
					<label className={styles.input_container}>
						<p className={styles.input_description}>
							Выберите вашу специальность
						</p>
						<select
							className={styles.input_select}
							data-key="role"
							defaultValue="student"
						>
							<option className={styles.input_option} value="kid">
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
								<p className={styles.input_description}>
									Введите дату рождения
								</p>
								<input
									className={styles.input}
									data-key="birthday"
									type="date"
								/>
							</label>
							<label className={styles.input_container}>
								<p className={styles.input_description}>
									Введите номер вашей группы или имя тренера
								</p>
								<input className={styles.input} data-key="group" type="text" />
							</label>
						</>
					)}

					<label className={styles.input_container}>
						<p className={styles.input_description}>Ваш e-mail</p>
						<input
							className={styles.input}
							data-key={login ? 'username' : 'email'}
							type="email"
							required
						/>
					</label>

					<label className={styles.input_container}>
						<p className={styles.input_description}>Пароль</p>
						<div className={styles.input_password}>
							<input
								className={styles.input}
								data-key="password"
								type="password"
								required
							/>
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
							<Link to="/politics" className={styles.confidence_politic_link}>
								политикой конфиденциальности
							</Link>
						</p>
						<input
							className={styles.input_checkbox}
							data-key="checkbox"
							type="checkbox"
							required
						/>
					</label>
					<Button className={styles.submit_btn} type="submit">
						{login ? 'Войти' : 'Зарегистрироваться'}
					</Button>
				</form>
				{login ? (
					<>
						<div className={styles.btn_container}>
							<a href="/#" className={styles.btn_label}>
								Нет аккаунта?
							</a>
							<Button
								onClick={() => navigate('/registration')}
								className={styles.btn}
							>
								Зарегистрироваться
							</Button>
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
