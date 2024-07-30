import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import classNames from 'classnames';
import { CalendarAddButton } from './CalendarAddButton/CalendarAddButton';
import { ScheduleHeader } from '../../../features/scheduleHeader/ScheduleHeader';
import styles from './Calendar.table.module.scss';
import { Modal } from '../../../shared/ui/modal/Modal';
import { AddTreanerSchedule } from '../../../features/addTreanerSchedule/ui/AddTreanerSchedule';

const CalendarTable = () => {
	const [startDate, setStartDate] = useState(moment());
	const [data] = useState(false);
	const [modalActive, setModalActive] = useState(false);

	window.moment = moment;
	moment.updateLocale('ru', { week: { dow: 1 } });
	const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

	const nextTwoWeeks = () => {
		const newStartDate = startDate.clone().add(14, 'days');
		setStartDate(newStartDate);
	};

	const prevTwoWeeks = () => {
		const newStartDate = startDate.clone().subtract(14, 'days');
		setStartDate(newStartDate);
	};

	const renderCalendarDays = () => {
		return [...Array(14)].map((_, index) => {
			const currentDate = startDate.clone().add(index, 'days');
			return (
				<li key={index} className={styles.days_item}>
					{currentDate.format('D')}
					{!data && (
						<CalendarAddButton
							className={styles.add_btn}
							onclick={() => {
								setModalActive(currentDate.format('D'));
							}}
						/>
					)}
				</li>
			);
		});
	};

	const generateHeader = (startDate) => {
		const endDate = startDate.clone().add(13, 'days');

		const startMonth = startDate.format('MMMM YYYY');
		const capitalizedStartMonth =
			startMonth.charAt(0).toUpperCase() + startMonth.slice(1);

		const endMonth = endDate.format('MMMM YYYY');
		const capitalizedEndMonth =
			endMonth.charAt(0).toUpperCase() + endMonth.slice(1);

		if (startDate.month() === endDate.month()) {
			return capitalizedStartMonth;
		} else {
			return `${capitalizedStartMonth} - ${capitalizedEndMonth}`;
		}
	};

	// const openModal = () => {
	// 	setModalActive(true);
	// };

	return (
		<>
			<div className={styles.datepicker}>
				<ScheduleHeader
					date={generateHeader(startDate)}
					onPrevClick={prevTwoWeeks}
					onNextClick={nextTwoWeeks}
				/>
				<div className={styles.grid_wrap}>
					<ul className={classNames(styles.grid, styles.weeks)}>
						{daysOfWeek.map((item) => (
							<li key={item} className={styles.weeks_item}>
								{item}
							</li>
						))}
					</ul>
					<ul className={classNames(styles.grid, styles.days)}>
						{renderCalendarDays()}
					</ul>
				</div>
			</div>
			<Modal active={modalActive} setActive={setModalActive} width={'1078px'}>
				<AddTreanerSchedule day={modalActive} />
			</Modal>
		</>
	);
};

export default CalendarTable;
