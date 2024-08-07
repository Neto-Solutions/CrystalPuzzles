import styles from './CheckIn.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from './wrapper/Wrapper';
import Input from './input/Input';
import Password from './password/Password';
import Politics from './policy/Policy';
import { Button } from '@shared/ui';
import { mapUserForm } from '@entities/profile';

import { validateUser } from '@const';
import LS from '@shared/lib/localStorage';

export default function CheckInPage({ login = false }) {
	const navigate = useNavigate();
	const [err, setErr] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();
		const data = mapUserForm(e);
		validateUser(data)
			.then(async (data) => {
				LS.set('profile', data);
				location.replace('/');
			})
			.catch(() => setErr('Что-то пошло не так, попробуйте ещё раз'));
	}

	return (
		<Wrapper>
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
						</>
					)}

					<Input
						label="Ваш e-mail"
						dataKey={login ? 'username' : 'email'}
						type="email"
						required
					/>

					<Password />

					{err && <div className={styles.error}>{err}</div>}

					{login && (
						<div className={styles.forget_password}>
							<a href="/#" className={styles.link}>
								Забыли пароль?
							</a>
						</div>
					)}

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
								<div htmlFor="registration" className={styles.link}>
									Нет аккаунта?
								</div>
								<Button
									title="Зарегистрироваться"
									id="registration"
									onClick={() => {
										setErr(null);
										navigate('/registration');
									}}
									className={styles.register_btn}
								/>
							</>
						)}
					</div>
				</form>
			</div>
		</Wrapper>
	);
}
