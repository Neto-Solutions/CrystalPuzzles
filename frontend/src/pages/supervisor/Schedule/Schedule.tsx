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
export default function ShedulePage({ edit = false }: ShedulePageProps) {
	const [modalActive, setModalActive]: any = useState(false);
	const [data, setData]: any = useState({
		space_id: null,
		trainer_id: null
	});
	const navigate = useNavigate();

	return (
		<Page title="Составить расписание тренеров">
			<Table edit={edit} setModalActive={setModalActive} />
			<div className={styles.buttons_container}>
				<DropDownButton
					title="Выберите тренера"
					data={[{ id: +'2', name: 'Тренер 2' }]}
					setState={(id: string) =>
						setData((prev: any) => ({ ...prev, trainer_id: id }))
					}
				/>
				{edit ? null : (
					<Button
						className={styles.edit_btn}
						title="Составить расписание"
						onClick={() => navigate('./edit')}
					/>
				)}
				{/* меняется высота у всех сразу, потому что состояние не у каждого отдельно, а в главном компоненте. //TODO: вернуть назад, как было */}
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
			{edit && modalActive ? (
				<Modal active={modalActive} setActive={setModalActive}>
					<AddTreanerSchedule day={modalActive} data={data} />
				</Modal>
			) : null}
		</Page>
	);
}
