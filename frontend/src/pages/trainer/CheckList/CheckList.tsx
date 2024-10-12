import styles from './CheckList.module.scss';
import { Page, Button } from '@shared/ui';
import ProfileCard from './ProfileCard/ProfileCard';
import Info from './Info/Info';
import { Exercises } from '@widgets';
import { FormEvent, useState } from 'react';
import StudentsDropdown from 'features/studentsDropdown/StudentsDropdown';
import { CheckList, Lesson } from '@shared/api';
import { TrainingI } from '@shared/api/checklist/checkList.interface';
import { useLoaderData } from 'react-router-dom';

interface CheckListPageProps {
	title: string;
}

export default function CheckListPage({ title }: CheckListPageProps) {
	const [students, setStudents] = useState([]);
	const { id }: any = useLoaderData();

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const result: TrainingI[] = [];
		const formElements = e.currentTarget.elements as HTMLFormControlsCollection;

		for (const el of formElements) {
			const inputElement = el as HTMLInputElement;
			if (!inputElement.id) continue;
			if (inputElement.checked) {
				result.push({
					training_id: +inputElement.value,
					repetitions: 1,
					assessment: 1
				});
			}
		}

		CheckList.create({
			lesson_id: id,
			student_ids: students,
			training_check: result
		}).catch();
	}

	return (
		<Page title={title}>
			<div className={styles.wrapper}>
				<ProfileCard className={styles.profile} />
				<Info className={styles.info} lessonId={id} />

				<section className={styles.panel_container}>
					<StudentsDropdown state={students} setState={setStudents} />
					{/* <PlacesDropdown /> */}
					<Button
						title="Отправить чек-лист"
						width="100%"
						form="exercises_form"
						bgColor="dark"
						className={styles.btn}
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
