import styles from './Table.module.scss';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import DaysList from './DaysList/DaysList';
import Header from './Header/Header';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';
import { useState, useEffect } from 'react';
import { Lesson } from '@shared/api';

const Table = ({
	setModalActive,
	modalActive,
	edit,
	data: { trainer_id }
}: any) => {
	const [date, setDate]: any = useState(moment().startOf('week'));
	const [data, setData]: any = useState(initData(date));

	useEffect(() => {
		if (!trainer_id) return;

		Lesson.get({
			start_date: date.clone().toISOString(),
			end_date: date.clone().add(13, 'days').toISOString(),
			trainer: trainer_id
		})
			.then((res) => {
				const obj = initData(date);
				res.forEach((item: any) => {
					const key = moment(item.start).format('YYYY-MM-DD');
					if (!Object.keys(obj).includes(key)) return;
					if (!obj[key]) obj[key] = [item];
					else obj[key] = [...obj[key], item];
				});
				setData(obj);
			})
			.catch();
	}, [date, trainer_id, modalActive]);

	return (
		<>
			<div className={styles.datepicker}>
				<Header setStartDate={setDate} startDate={date} />
				<div className={styles.grid_wrap}>
					<DaysOfWeek />
					<DaysList data={data} setModalActive={setModalActive} edit={edit} />
				</div>
			</div>
		</>
	);
};

export default Table;

function initData(date: Moment) {
	const obj: any = {};
	for (let index = 0; index < 14; index++) {
		obj[moment(date).add(index, 'days').format('YYYY-MM-DD')] = null;
	}
	return obj;
}
