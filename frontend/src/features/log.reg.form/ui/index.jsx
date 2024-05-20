import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Button from '@shared/ui/button/Button';
import { authUser, registerUser, mapUserForm } from '@entities/user';
import Input from './input/Input';
import Password from './password/Password';
import Politics from './politics/Politics';

export default function LogRegForm({ login = false }) {
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		const data = mapUserForm(e);
		(login
			? authUser(data).catch((err) => err)
			: registerUser(data)
					.then(() =>
						authUser({
							username: data.email,
							password: data.password
						})
					)
					.catch((err) => err)
		).then(() => location.reload('/'));
	}
	return (
		<div className={styles.container}>
			<h1 className={styles.header}>
				{login ? 'Войти' : 'Зарегистрироваться'}
			</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				{!login && (
					<>
						<Input label="ФИО" dataKey="name" type="text" />
					</>
				)}
				{!login && (
					<>
						<Input
							label="Введите дату рождения"
							dataKey="birthday"
							type="date"
						/>
						<Input
							label="Введите номер вашей группы или имя тренера"
							dataKey="group"
							type="text"
						/>
					</>
				)}

				<Input
					label="Ваш e-mail"
					dataKey={login ? 'username' : 'email'}
					type="email"
					required
				/>

				<Password />

				<div className={styles.forget_password}>
					<a href="/#" className={styles.link}>
						Забыли пароль?
					</a>
				</div>

				<Politics />

				<div className={styles.btn_container}>
					<Button
						title={login ? 'Войти' : 'Зарегистрироваться'}
						type="submit"
						width="100%"
						height="53px"
					/>

					{login && (
						<>
							<label htmlFor="registration" className={styles.link}>
								Нет аккаунта?
							</label>
							<Button
								title="Зарегистрироваться"
								id="registration"
								onClick={() => navigate('/registration')}
								width="fit-content"
								height="53px"
							/>
						</>
					)}
				</div>
			</form>
		</div>
	);
}
