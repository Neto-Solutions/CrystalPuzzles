import { useLoaderData, useNavigate } from 'react-router-dom';
import styles from './Profile.module.scss';
import { Page, Button } from '@shared/ui';

export default function StudentPage({ title }) {
	const user = useLoaderData();
	const navigate = useNavigate();
	return (
		<Page title={title}>
			<section className={styles.description_container}>
				<article className={styles.name}>
					{user.surname + ' ' + user.firstname + ' ' + user.lastname}
				</article>
				<article className={styles.description}>
					<div className="">
						<span className={styles.title}>Дата рождения :</span>{' '}
						{user.birthday}
					</div>
					<div className="">
						<span className={styles.title}>Номер телефона :</span>{' '}
						{user.contact}
					</div>
				</article>
			</section>
			<section className={styles.student_panel}>
				<article className={styles.avatar_container}>
					<img
						className={styles.avatar}
						src={require(`assets/avatar/${user.avatar}.png`)}
					/>
				</article>
				<article className={styles.button_container}>
					<Button title="Добавить в группу" />
					<Button title="Вернуться" onClick={() => navigate(-1)} />
				</article>
			</section>
		</Page>
	);
}
