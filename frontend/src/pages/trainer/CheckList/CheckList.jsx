import styles from './CheckList.module.scss';
import { Page, Button } from '@shared/ui';
import { useLoaderData } from 'react-router-dom';
import Profile from './Profile/Profile';
import Info from './Info/Info';
import { Exercises } from '@widgets';

export default function CheckListPage() {
	const { data } = useLoaderData();

	function handleSubmit(e) {
		e.preventDefault();
		let result = [];
		for (const el of e.target) {
			if (!el.id) continue;
			if (el.checked) {
				result.push({
					id: el.id,
					isComplete: false
				});
			}
		}
	}

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
				<section className={styles.exercises}>
					<form
						onSubmit={handleSubmit}
						id="exercises_form"
						className={styles.exercises}
					>
						<Exercises data={data} />
					</form>
				</section>
			</div>
		</Page>
	);
}
