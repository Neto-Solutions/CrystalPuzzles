import styles from './CalendarBlock.module.scss';
import { useEffect, useState } from 'react';
import Header from './Header/Header';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';

export default function CalendarBlock({ date, setDate, onHide }) {
	const [days, setDays] = useState([]);
	const [activeDay, setActiveDay] = useState();

	useEffect(() => {
		const startOfMonth = date.clone().startOf('month').day();
		const daysInMonth = date.clone().endOf('month').date();
		setDays(() =>
			Array.from({ length: startOfMonth - 1 }, () => '').concat(
				Array.from({ length: daysInMonth }, (_, i) => i + 1)
			)
		);
		setActiveDay();
	}, [date]);

	return (
		<div className={styles.container}>
			<Header date={date} setDate={setDate} onHide={onHide} />
			<div className={styles.body_container}>
				<DaysOfWeek />
				<div className={styles.body}>
					{days.map((day, index) => {
						return (
							<div
								key={index}
								data-active={activeDay == day}
								{...(Number(day) && {
									className: { ...styles.day },
									onClick: () => {
										setActiveDay(day);
										setDate(() => date.clone().date(day).toDate());
									}
								})}
							>
								{day}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
