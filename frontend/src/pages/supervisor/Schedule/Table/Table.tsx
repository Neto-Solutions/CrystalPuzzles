import styles from './Table.module.scss';
import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import DaysList from './DaysList/DaysList';
import Header from './Header/Header';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';

const Table = ({ setModalActive, edit }: any) => {
	const [date, setDate]: any = useState(moment().startOf('week'));

	return (
		<>
			<div className={styles.datepicker}>
				<Header setStartDate={setDate} startDate={date} />
				<div className={styles.grid_wrap}>
					<DaysOfWeek />
					<DaysList date={date} setModalActive={setModalActive} edit={edit} />
				</div>
			</div>
		</>
	);
};

export default Table;
