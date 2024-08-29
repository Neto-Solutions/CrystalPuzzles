import styles from './Schedule.module.scss';
import { useState } from 'react';
import { Page, Button } from '@shared/ui';
import Table from './Table/Table';
import { Modal } from '@shared/ui';
import { AddTreanerSchedule } from './Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { DropDownButton } from '@features';

interface ShedulePageProps {
	edit?: boolean;
}

const data = [
	{
		id: 1,
		name: 'ddfddd'
	},
	{
		id: 2,
		name: 'kökö'
	},
	{
		id: 3,
		name: 'dfd'
	},
	{
		id: 4,
		name: 'asdad'
	}
];

export default function ShedulePage({ edit = false }: ShedulePageProps) {
	const [modalActive, setModalActive]: any = useState(false);
	// const lessons = useLoaderData();
	const navigate = useNavigate();
	return (
		<Page title="Составить расписание тренеров">
			<Table edit={edit} setModalActive={setModalActive} />
			<div className={styles.buttons_container}>
				<DropDownButton title="Выберите тренера" data={data} />
				<DropDownButton title="Выберите площадку" data={data} />
				<Button
					className={styles.edit_btn}
					title={edit ? 'Отправить расписание' : 'Составить расписание'}
					onClick={() => {
						edit ? null : navigate('./edit');
					}}
				/>
			</div>
			{edit ? (
				<Modal active={modalActive} setActive={setModalActive}>
					<AddTreanerSchedule day={modalActive} />
				</Modal>
			) : null}
		</Page>
	);
}
