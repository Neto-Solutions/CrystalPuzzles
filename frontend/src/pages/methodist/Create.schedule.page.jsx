// import {Link} from "react-router-dom";
import left_arrow from '../../assets/svg/calendar_arrow_left.svg';
import right_arrow from '../../assets/svg/calendar_arrow_right.svg';
import PageContainer from '../../components/page.container/Page.container';
import Button from '../../components/button/Button';
import styles from './Create.schedule.page.module.scss';

export default function CreateShedulePage() {
	const tempArray = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
	const tempArray2 = Array.from({ length: 14 }, (_, i) => i + 1);

	return (
		<>
			<PageContainer.Header title="Составить расписание тренеров" />
			<PageContainer.Body>
				<div className={styles.calendar}>
					<header className={styles['make_timetable_met_calendar_head']}>
						<img
							src={left_arrow}
							className={styles['make_timetable_met_calendar_left_arrow']}
							alt=""
						/>
						<h1 className={styles['make_timetable_met_calendar_current_date']}>
							Май, 2022
						</h1>
						<img
							src={right_arrow}
							className={styles['make_timetable_met_calendar_left_arrow']}
							alt=""
						/>
					</header>
					<div
						className={
							styles['make_timetable_met_calendar_week_days_name_cont']
						}
					>
						{tempArray.map((item, index) => (
							<div
								key={index}
								className={styles['make_timetable_met_calendar_week_day_name']}
							>
								{item}
							</div>
						))}
					</div>
					<div
						className={styles['make_timetable_met_calendar_month_days_cont']}
					>
						{tempArray2.map((item, index) => (
							<div
								key={index}
								className={styles['make_timetable_met_calendar_month_day']}
							>
								{item}
							</div>
						))}
					</div>
				</div>
				<div className={styles['btns-wrap']}>
					<select className={styles['choose-btn']}>
						<option> Выберите тренера</option>
					</select>
					<select className={styles['choose-btn']}>
						<option>Выберите площадку</option>
					</select>
					{/* <div className='make_timetable_met_send_shedule_cont'> */}
					{/* <Link className="make_timetable_met_send_shedule_link">Отправить расписание</Link> */}
					{/* </div> */}
					<Button>Отправить расписание</Button>
				</div>
			</PageContainer.Body>
		</>
	);
}
