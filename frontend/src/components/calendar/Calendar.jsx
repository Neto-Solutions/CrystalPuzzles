import './Calendar.css';

import { useEffect, useState } from 'react';
import { ReactComponent as LeftArrow } from '../../assets/svg/small_calendar_arrow_left.svg';
import { ReactComponent as RightArrow } from '../../assets/svg/small_calendar_arrow_right.svg';
import moment from 'moment';

export default function Calendar() {
	const [date, setDate] = useState(moment());
	const [days, setDays] = useState([]);
	const [activeDay, setActiveDay] = useState();
	const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
	const monthsOfYear = [
		'январь',
		'февраль',
		'март',
		'апрель',
		'май',
		'июнь',
		'июль',
		'август',
		'сентябрь',
		'октябрь',
		'ноябрь',
		'декабрь'
	];

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
		<div className="calendar">
			<div className="calendar_header">
				<div className="calendar_header_date">
					{monthsOfYear[date.month()] + ' ' + date.year()}
				</div>
				<div className="calendar_header_date_btn_container">
					<div
						className="calendar_header_date_btn"
						onClick={() => {
							setDate(date.clone().subtract(1, 'month'));
						}}
					>
						<LeftArrow />
					</div>
					<div
						className="calendar_header_date_btn"
						onClick={() => {
							setDate(date.clone().add(1, 'month'));
						}}
					>
						<RightArrow />
					</div>
				</div>
			</div>
			<div className="calendar_body">
				<div className="calendar_body_day_name_container">
					{daysOfWeek.map((day, index) => {
						return (
							<div key={index} className="calendar_body_day_name">
								{day}
							</div>
						);
					})}
				</div>
				<div className="calendar_body_day_container">
					{days.map((day, index) => {
						return (
							<div
								key={index}
								data-active={activeDay === day}
								{...(Number(day) && {
									className: 'calendar_body_day',
									onClick: () => setActiveDay(day)
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
