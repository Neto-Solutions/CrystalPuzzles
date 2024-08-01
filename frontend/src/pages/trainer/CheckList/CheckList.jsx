/* eslint-disable no-console */
import styles from './CheckList.module.scss';
import { Page, Button } from '@shared/ui';
import { useLoaderData } from 'react-router-dom';
import Profile from './Profile/Profile';
import Info from './Info/Info';
import Exercises from './Exercises/Exercises';

export default function CheckListPage() {
	const { data } = useLoaderData();

	return (
		<Page title="Чек-листы">
			<div className={styles.wrapper}>
				<Profile className={styles.profile} />
				<Info className={styles.info} data={data} />

				<section className={styles.panel_container}>
					<Button title="Выберите группу" downArrow width="100%" />
					<Button title="Выберите учеников" downArrow width="100%" />
					<Button
						title="Отправить чек-лист"
						width="100%"
						form="exercises_form"
					/>
				</section>
				<Exercises
					className={styles.exercises}
					formId="exercises_form"
					lessonId={data._id}
				/>
			</div>
		</Page>
	);
}
