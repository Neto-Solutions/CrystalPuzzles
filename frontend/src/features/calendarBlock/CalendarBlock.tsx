import styles from './CalendarBlock.module.scss';
import { useEffect, useState } from 'react';
import Header from './Header/Header';
import DaysOfWeek from './DaysOfWeek/DaysOfWeek';
import moment from 'moment';

interface ICalendarBlock {
	date: any;
	setDate: any;
	onHide?: any;
	range?: boolean;
}

export default function CalendarBlock({
	date,
	setDate,
	onHide,
	range = false
}: ICalendarBlock) {
	const [days, setDays]: any = useState([]);
	const [month, setMonth]: any = useState(moment());

	useEffect(() => {
		const startOfMonth = moment(month).startOf('month').day();
		const daysInMonth = moment(month).endOf('month').date();
		setDays(() => {
			const skipDays: any = Array.from(
				{ length: startOfMonth ? startOfMonth - 1 : 6 },
				() => ''
			);
			const days: any = Array.from({ length: daysInMonth }, (_, i) => i + 1);
			return skipDays.concat(days);
		});
	}, [month]);

	return (
		<div className={styles.container}>
			<Header month={month} setMonth={setMonth} onHide={onHide} />
			<div className={styles.body_container}>
				<DaysOfWeek />
				<div className={styles.body}>
					{days.map((day: any, index: any) => {
						return (
							<div
								key={index}
								data-active={moment(month)
									.set('date', day)
									.isBetween(
										moment(date.from).startOf('day'),
										moment(date.to).endOf('day')
									)}
								{...(Number(day) && {
									className: styles.day,
									onClick: () => {
										range
											? setRange(setDate, month, day)
											: setDay(setDate, month, day);
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

function setRange(fn: any, month: number, day: number) {
	fn(({ from, to }: any) => {
		from = moment(from).startOf('day');
		to = moment(to).startOf('day');
		const newDate = moment(month).set('date', day);
		if (!from.isSame(to)) {
			to = newDate;
			from = newDate;
		}
		if (newDate.isBefore(from)) {
			from = newDate;
		} else if (newDate.isAfter(from)) {
			to = newDate;
		}
		from = from.clone().startOf('day');
		to = to.clone().endOf('day');
		return { from, to };
	});
}

function setDay(fn: any, month: any, day: any) {
	fn(({ from, to }: any) => {
		const date = moment(month).date(day);
		from = date.startOf('day');
		to = date.endOf('day');
		return { from, to };
	});
}
