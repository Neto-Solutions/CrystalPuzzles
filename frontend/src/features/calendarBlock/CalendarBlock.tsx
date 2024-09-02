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
			const skipDays: any = Array.from({ length: startOfMonth - 1 }, () => '');
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
									.date(day)
									.isBetween(
										moment(date.from).subtract(1, 'day'),
										moment(date.to)
									)}
								{...(Number(day) && {
									className: styles.day,
									onClick: () => {
										range
											? setRange(setDate, month, ++day)
											: setDay(setDate, month, ++day);
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

function setRange(fn: any, month: any, day: any) {
	fn(({ from, to }: any) => {
		from = moment(from);
		to = moment(to);
		const date = moment(month).date(day);
		if (!from.isSame(to)) {
			to = date;
			from = date;
		}
		if (date.isBefore(from)) {
			from = date;
		} else if (date.isAfter(from)) {
			to = date;
		}
		from = from.startOf('day').toISOString();
		to = to.startOf('day').toISOString();
		return { from, to };
	});
}

function setDay(fn: any, month: any, day: any) {
	fn(({ from, to }: any) => {
		from = moment(from);
		to = moment(to);
		const date = moment(month).date(day);
		from = date.startOf('day').toISOString();
		to = date.startOf('day').toISOString();
		return { from, to };
	});
}
