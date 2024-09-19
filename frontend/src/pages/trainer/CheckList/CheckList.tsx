import styles from './CheckList.module.scss';
import { Page, Button } from '@shared/ui';
import ProfileCard from './ProfileCard/ProfileCard';
import Info from './Info/Info';
import { Exercises } from '@widgets';
import { FormEvent, useEffect, useState } from 'react';
import StudentsDropdown from 'features/studentsDropdown/StudentsDropdown';

interface CheckListPageProps {
	title: string;
}

export default function CheckListPage({ title }: CheckListPageProps) {
	const [exercises, setExercises] = useState([]);
	const [students, setStudents] = useState([]);

	useEffect(() => {
		console.log('exercises', exercises);
		console.log('studets', students);
	}, [exercises, students]);

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const result: any = [];
		const formElements = e.currentTarget.elements as HTMLFormControlsCollection;

		for (const el of formElements) {
			const inputElement = el as HTMLInputElement;
			if (!inputElement.id) continue;
			if (inputElement.checked) {
				result.push(inputElement.value);
			}
		}
		setExercises(result);
	}

	return (
		<Page title={title}>
			<div className={styles.wrapper}>
				<ProfileCard className={styles.profile} />
				<Info className={styles.info} />

				<section className={styles.panel_container}>
					<Button title="Выберите группу" downArrow width="100%" />
					<StudentsDropdown state={students} setState={setStudents} />
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
						<Exercises />
					</form>
				</section>
			</div>
		</Page>
	);
}
