import styles from './Schedule.module.scss';
import { useState } from 'react';
import { Page, Button } from '@shared/ui';
import Table from './Table/Table';
import { Modal } from '@shared/ui';
import { AddTreanerSchedule } from './Modal/Modal';
import { useNavigate } from 'react-router-dom';
import TrainersDropdown from 'features/trainersDropdown/TrainersDropdown';

interface ShedulePageProps {
	edit?: boolean;
	title: string;
}

export default function ShedulePage({ edit = false, title }: ShedulePageProps) {
	const [modalActive, setModalActive] = useState(false);
	const [data, setData] = useState({
		space_id: null,
		trainer_id: null
	});
	const navigate = useNavigate();

	return (
		<Page title={title}>
			<Table
				edit={edit}
				modalActive={modalActive}
				setModalActive={setModalActive}
				data={data}
			/>
			<div className={styles.buttons_container}>
				<TrainersDropdown
					setState={(id: string) => {
						setData((prev: any) => ({ ...prev, trainer_id: id }));
					}}
					state={data.trainer_id}
					single
				/>
				{edit ? null : (
					<Button
						className={styles.edit_btn}
						title="Составить расписание"
						onClick={() => navigate('./edit')}
					/>
				)}
			</div>
			{edit && modalActive ? (
				<Modal active={modalActive} setActive={setModalActive}>
					<AddTreanerSchedule
						day={modalActive}
						data={data}
						setActive={setModalActive}
					/>
				</Modal>
			) : null}
		</Page>
	);
}
