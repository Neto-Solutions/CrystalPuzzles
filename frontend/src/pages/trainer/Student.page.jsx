import styles from './Student.page.module.scss';
import { Page } from '@shared/ui';
import { Button } from '@shared/ui';

export default function StudentPage() {
	return (
		<Page title="Ученики">
			<section className={styles.description_container}>
				<article className={styles.name}>
					Дмитриева Анастасия Алексеевна
				</article>
				<article className={styles.description}>
					<div className="">
						<span className={styles.title}>Дата рождения :</span> 21.03.2013
					</div>
					<div className="">
						<span className={styles.title}>Адрес проживания : </span>
						г. Москва, ул. Донская, д. 8 стр. 1{' '}
					</div>
					<div className="">
						<span className={styles.title}>Родитель или попечитель :</span>{' '}
						Дмитриева Ангелина Игоревна
					</div>
					<div className="">
						<span className={styles.title}>Номер телефона :</span> +7 920 111 11
						11{' '}
					</div>
					<div className="">
						<span className={styles.title}>Особенности развития :</span>{' '}
					</div>
					<div className="">
						<span className={styles.title}>Не любит :</span>{' '}
					</div>
				</article>
			</section>
			<section className={styles.student_panel}>
				<article className={styles.avatar_container}>
					<img className={styles.avatar} />
				</article>
				<article className={styles.button_container}>
					<Button title="Добавить в группу" />
					<Button title="Вернуться" />
				</article>
			</section>
		</Page>
	);
}
