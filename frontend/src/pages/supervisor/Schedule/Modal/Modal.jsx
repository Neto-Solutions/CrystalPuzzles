import styles from './Modal.module.scss';
import { useState } from 'react';
import { Button } from '@shared/ui';
import { DropdownButton } from '@features/dropdownButton/DropdownButton';
import { DateChanger } from '@features/DateChanger/DateChanger';

export const AddTreanerSchedule = ({ day }) => {
	const [openTrainers, setOpenTrainers] = useState(false);
	const [openPlatform, setOpenPlatform] = useState(false);

	const [data, setData] = useState({
		space_id: null,
		trainer_id: null,
		trainer_comments: '',
		start: new Date()
	});

	const setTrainer = (id) => {
		setData((prev) => ({ ...prev, trainer_id: id }));
	};

	const setSpace = (id) => {
		setData((prev) => ({ ...prev, space_id: id }));
	};

	const handleSubmit = async () => {
		return data;
	};
	return (
		<div className={styles.component}>
			<DateChanger day={day} className={styles.header} />
			<main className={styles.main}>
				<DropdownButton
					title={'Выберите тренера'}
					onClick={() => setOpenTrainers((prev) => !prev)}
					// width={'347px'}
					// data={trainers}
					open={openTrainers}
					setState={setTrainer}
				/>
				<DropdownButton
					title={'Выберите площадку'}
					onClick={() => setOpenPlatform((prev) => !prev)}
					// width={'347px'}
					// data={platforms}
					open={openPlatform}
					setState={setSpace}
				/>
				<Button onClick={handleSubmit}>Отправить</Button>
			</main>
		</div>
	);
};
