import styles from './Schedule.module.scss';
import { useState } from 'react';
import { Page, Button } from '@shared/ui';
import Table from './Table/Table';
import { Modal } from '@shared/ui';
import { AddTreanerSchedule } from './Modal/Modal';

export default function ShedulePage({ edit = false }) {
	const [modalActive, setModalActive] = useState(false);
	return (
		<Page title="Составить расписание тренеров">
			<Table edit={edit} setModalActive={setModalActive} />
			{edit ? (
				<>
					<div className={styles.buttons_container}>
						<Button title="Выберите тренера" downArrow />
						<Button title="Выберите площадку" downArrow />
						<Button title="Отправить расписание" />
					</div>
					<Modal
						active={modalActive}
						setActive={setModalActive}
						width={'1078px'}
					>
						<AddTreanerSchedule day={modalActive} />
					</Modal>
				</>
			) : null}
		</Page>
	);
}
