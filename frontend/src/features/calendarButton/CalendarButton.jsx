import styles from './CalendarButton.module.scss';
import { useState } from 'react';
import moment from 'moment';
import { ReactComponent as CalendarIcon } from '@shared/assets/svg/calendar_icon.svg';
import { Button } from '@shared/ui';
import CalendarBlock from '../calendarBlock/CalendarBlock';

export default function CalendarButton({ date, setDate, range }) {
	const [calendar, setCalendar] = useState(false);

	return (
		<>
			{calendar ? (
				<CalendarBlock
					date={date}
					setDate={setDate}
					onHide={() => setCalendar(false)}
					range={range}
				/>
			) : (
				<Button
					title={
						moment(date.from).subtract(1, 'day').format('DD.MM.YYYY') +
						' - ' +
						moment(date.to).subtract(1, 'day').format('DD.MM.YYYY')
					}
					onClick={() => setCalendar(!calendar)}
					className={styles.btn}
				>
					<CalendarIcon />
				</Button>
			)}
		</>
	);
}
