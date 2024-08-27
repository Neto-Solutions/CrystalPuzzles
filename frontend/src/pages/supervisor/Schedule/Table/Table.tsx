import styles from './Table.module.scss';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import DaysList from './DaysList/DaysList';
import Header from './Header/Header';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';
import { Lesson } from '@shared/api';

const Table = ({ setModalActive, edit }: any) => {
	const [date, setDate]: any = useState(moment());
	const [data, setData]: any = useState([]);

	useEffect(() => {
		getLessons();
	}, []);

	function getLessons() {
		Lesson.get({
			start: date,
			end: moment(date).add(13, 'days').toDate()
		}).then(setData);
	}

	return (
		<>
			<div className={styles.datepicker}>
				<Header setStartDate={setDate} startDate={date} />
				<div className={styles.grid_wrap}>
					<DaysOfWeek />
					<DaysList
						data={data}
						date={date}
						setModalActive={setModalActive}
						edit={edit}
					/>
				</div>
			</div>
		</>
	);
};

export default Table;
