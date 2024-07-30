import { useState } from 'react';
import 'moment/locale/ru';
import { ScheduleHeader } from '../../scheduleHeader/ScheduleHeader';
import { DropdownButton } from '../../dropdownButton/DropdownButton';
import styles from './AddTreanerSchedule.module.scss';

import { trainers, platforms } from '../Mockdata/data';
import Button from '../../../shared/ui/button/Button';
import { postData } from '../../../entities/schedule/api/schedule';
import { DateChanger } from '../../DateChanger/DateChanger';


export const AddTreanerSchedule = ({day}) => {
	const [openTrainers, setOpenTrainers] = useState(false); //открыть-зыкрыть
	const [openPlatform, setOpenPlatform] = useState(false);
	const [test, setTest] = useState({
		space_id: null,
		trainer_id: null,
		trainer_comments: '',
		start: new Date()
	});

	const setTrainer = (id) => {
		setTest((prev) => {
			return { ...prev, trainer_id: id };
		});
	};

	const setSpace = (id) => {
		setTest((prev) => {
			return { ...prev, space_id: id };
		});
	};

	const handleSubmit = async () => {
		postData(test);
	};
	// TODO: доделать функциoнал
	return (
		<div className={styles.component}>
			{/* <ScheduleHeader date={'heute'} className={styles.header} /> */}
			<DateChanger day={day} className={styles.header}/>
			<main className={styles.main}>
				<DropdownButton
					title={'Выберите тренера'}
					onClick={() => setOpenTrainers((prev) => !prev)}
					// width={'347px'}
					data={trainers}
					open={openTrainers}
					setState={setTrainer}
				/>
				<DropdownButton
					title={'Выберите площадку'}
					onClick={() => setOpenPlatform((prev) => !prev)}
					// width={'347px'}
					data={platforms}
					open={openPlatform}
					setState={setSpace}
				/>
				<Button onClick={handleSubmit}>Отправить</Button>
			</main>
		</div>
	);
};
