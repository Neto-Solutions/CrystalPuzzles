import styles from './CheckList.module.scss';
import { Page, Button } from '@shared/ui';
import { useLoaderData } from 'react-router-dom';
import Profile from './Profile/Profile';
import Info from './Info/Info';
import { Exercises } from '@widgets';
import { FormEvent } from 'react';

export default function CheckListPage() {
	const data: any = useLoaderData();

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const result: Array<{ id: string; isComplete: boolean }> = [];
		const formElements = e.currentTarget.elements as HTMLFormControlsCollection;

		for (const el of formElements) {
			const inputElement = el as HTMLInputElement;
			if (!inputElement.id) continue;
			if (inputElement.checked) {
				result.push({
					id: inputElement.id,
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
						<Exercises data={data.checkList.exercises} />
					</form>
				</section>
			</div>
		</Page>
	);
}
