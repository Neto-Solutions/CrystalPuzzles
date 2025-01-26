import styles from './CheckList.module.scss';
import { Page, Button } from '@shared/ui';
import ProfileCard from './ProfileCard/ProfileCard';
import Info from './Info/Info';
import { Exercises } from '@widgets';
import { FormEvent, useEffect, useState } from 'react';
import StudentsDropdown from 'features/studentsDropdown/StudentsDropdown';
import { CheckList } from '@shared/api';
import { TrainingI } from '@shared/api/checklist/checkList.interface';
import { useLoaderData } from 'react-router-dom';

interface CheckListPageProps {
	title: string;
}
//TODO: optimize
export default function CheckListPage({ title }: CheckListPageProps) {
	let students: number[] = [];
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

		const data = {
			lesson_id: id,
			student_ids: students,
			training_check: result
		};

		createCheckList(data);
	}

	async function createCheckList(data: any) {
		const [, err] = await CheckList.create(data);
		if (err) return;
		location.replace('/exercises/' + id);
	}

	return (
		<Page title={title}>
			<div className={styles.wrapper}>
				<ProfileCard className={styles.profile} />
				<Info className={styles.info} lessonId={id} />

				<section className={styles.panel_container}>
					<DropStudents onChange={(ids: any) => (students = ids)} />
					{/* <StudentsDropdown state={students} setState={setStudents} /> */}
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

function DropStudents({ onChange }: any) {
	const [students, setStudents] = useState([]);

	useEffect(() => {
		onChange(students);
	}, [students]);

	return <StudentsDropdown state={students} setState={setStudents} />;
}
