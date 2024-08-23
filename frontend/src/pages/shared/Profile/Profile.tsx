import { useLoaderData, useNavigate } from 'react-router-dom';
import styles from './Profile.module.scss';
import { Page, Button } from '@shared/ui';

export default function StudentPage({ title }: any) {
	const user: any = useLoaderData();
	const navigate = useNavigate();
	return (
		<Page title={title}>
			<div className={styles.wrapper}>
				<section className={styles.student_panel}>
					<img
						className={styles.avatar}
						src={require(`assets/avatar/${user.avatar}.png`)}
					/>
					<div className={styles.name}>
						{user.surname + ' ' + user.firstname + ' ' + user.lastname}
					</div>
				</section>

				<section className={styles.description_container}>
					<article className={styles.description}>
						<div>
							<span className={styles.title}>Дата рождения:</span>
							<span>{user.birthday}</span>
						</div>
						<div>
							<span className={styles.title}>Адрес проживания:</span>
						</div>
						<div>
							<span className={styles.title}>Родитель или попечитель:</span>
						</div>
						<div>
							<span className={styles.title}>Номер телефона:</span>
							<span>{user.contact}</span>
						</div>
						<div>
							<span className={styles.title}>Особенности развития: </span>
						</div>
						<div>
							<span className={styles.title}>Не любит: </span>
						</div>
					</article>
					<article className={styles.button_container}>
						<Button title="Добавить в группу" />
						<Button title="Вернуться" onClick={() => navigate(-1)} />
					</article>
				</section>
			</div>
		</Page>
	);
}
