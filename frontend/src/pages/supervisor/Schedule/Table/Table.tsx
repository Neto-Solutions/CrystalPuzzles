import styles from './Table.module.scss';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import DaysList from './DaysList/DaysList';
import Header from './Header/Header';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';
// import { Lesson } from '@shared/api';

const Table = ({ setModalActive, edit }: any) => {
	const [date, setDate]: any = useState(moment().startOf('week'));
	const [data, setData]: any = useState({});

	useEffect(() => {
		// gen object
		const obj: any = {};
		for (let index = 0; index < 14; index++) {
			obj[moment(date).add(index, 'days').format('YYYY-MM-DD')] = {
				id: index,
				space: { id: index, name: 'Площадка' + index },
				trainer: {
					id: index,
					firstname: 'Тренер',
					lastname: 'Тренер',
					surname: 'Тренер',
					avatar: '0'
				},
				start: moment(date).add(index, 'days').toDate(),
				trainer_comments: 'Комментарии',
				modified: false // customs
			};
		}
		// get Data
		// Lesson.get({
		// 	start: date.clone().toDate(),
		// 	end: date.clone().add(13, 'days').toDate()
		// }).then((res) => {
		// 	res.forEach((item: any) => {
		// 		const key = moment(item.start).format('YYYY-MM-DD');
		// 		const el = obj[key];
		// 		if (!el) return;
		// 		el.data = item;
		// 	});
		// });
		setData(obj);
	}, [date]);

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
