import { mapUserForm } from '@entities';
import { Button } from '@shared/ui';
import Politics from '../policy/Policy';
import Password from '../password/Password';
import styles from './ChangePass.module.scss';
import { FormEvent, useState } from 'react';
import Wrapper from '../wrapper/Wrapper';
import Input from '../input/Input';
import { Auth } from '@shared/api';

export default function ChangePass() {
	const [err, setErr] = useState<string | null>(null);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const data = mapUserForm(e);
		if (!data) return;
		if (data.new_password !== data.repeat_password) {
			setErr('Пароли не совпадают');
			return;
		}

		const [, err] = await Auth.changePassword(data);
		if (err) {
			setErr(err);
			return;
		}
	}

	return (
		<Wrapper>
			<div className={styles.container}>
				<h1 className={styles.header}>Сменить пароль</h1>
				<form onSubmit={handleSubmit} className={styles.form}>
					<Input
						label="Ваш e-mail"
						dataKey="email"
						type="email"
						required
						placeholder="ivanov@example.com"
					/>

					<Password title="Старый пароль" dataKey="old_password" />
					<Password title="Новый пароль" dataKey="new_password" />
					<Password title="Повторите новый пароль" dataKey="repeat_password" />

					{err && <div className={styles.error}>{err}</div>}

					<Politics />

					<div className={styles.btn_container}>
						<Button
							title={'Сменить'}
							type="submit"
							width="100%"
							height="53px"
							bgColor="dark"
						/>
					</div>
				</form>
			</div>
		</Wrapper>
	);
}
