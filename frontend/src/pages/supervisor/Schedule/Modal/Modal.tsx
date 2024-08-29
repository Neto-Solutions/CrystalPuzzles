import styles from './Modal.module.scss';
import { useState } from 'react';
import { Button } from '@shared/ui';
import { DropDownButton, DateChanger } from '@features';

export const AddTreanerSchedule = ({ day }: any) => {
	const [data, setData]: any = useState({
		space_id: null,
		trainer_id: null,
		trainer_comments: '',
		start: new Date()
	});

	const setTrainer = (id: string) => {
		setData((prev: any) => ({ ...prev, trainer_id: id }));
	};

	const setSpace = (id: string) => {
		setData((prev: any) => ({ ...prev, space_id: id }));
	};

	const handleSubmit = async () => {
		return data;
	};
	return (
		<div className={styles.component}>
			<DateChanger day={day} className={styles.header} />
			<main className={styles.main}>
				<DropDownButton title={'Выберите тренера'} setState={setTrainer} />
				<DropDownButton title={'Выберите площадку'} setState={setSpace} />
				<Button onClick={handleSubmit}>Отправить</Button>
			</main>
		</div>
	);
};
