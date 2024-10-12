import { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import classNames from 'classnames';
import 'moment/locale/ru';
import { Lesson } from '@shared/api';
import Header from './Header/Header';
import DaysList from './DaysList/DaysList';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';
import styles from './Table.module.scss';

interface TableProps {
	setModalActive: (active: any) => void;
	modalActive: boolean;
	edit: boolean;
	data: any;
	className?: string;
}

const Table = ({
	setModalActive,
	modalActive,
	edit,
	data: { trainer_id },
	className
}: TableProps) => {
	const [date, setDate]: any = useState(moment().startOf('week'));
	const [data, setData]: any = useState(initData(date));

	useEffect(() => {
		setData(initData(date));
		getLessons();
	}, [date, trainer_id, modalActive]);

	async function getLessons() {
		if (!trainer_id || !date) return;
		const [data, err] = await Lesson.get({
			start_date: date.clone().toISOString(),
			end_date: date.clone().add(13, 'days').toISOString(),
			trainer: trainer_id
		});
		if (err) return;
		const obj = initData(date);
		data.forEach((item: any) => {
			const key = moment(item.start).format('YYYY-MM-DD');
			if (!Object.keys(obj).includes(key)) return;
			if (!obj[key]) obj[key] = [item];
			else obj[key] = [...obj[key], item];
		});
		setData(obj);
	}

	return (
		<div className={classNames(styles.datepicker, className)}>
			<Header setStartDate={setDate} startDate={date} />
			<div className={styles.grid_wrap}>
				<DaysOfWeek />
				<DaysList data={data} setModalActive={setModalActive} edit={edit} />
			</div>
		</div>
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
