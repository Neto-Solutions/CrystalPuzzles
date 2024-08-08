import styles from './Table.module.scss';
import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import DaysList from './DaysList/DaysList';
import Header from './Header/Header';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';

const Table = ({ setModalActive }) => {
	const [startDate, setStartDate] = useState(moment());

	return (
		<>
			<div className={styles.datepicker}>
				<Header setStartDate={setStartDate} startDate={startDate} />
				<div className={styles.grid_wrap}>
					<DaysOfWeek />
					<DaysList date={startDate} setModalActive={setModalActive} />
				</div>
			</div>
		</>
	);
};

export default Table;
