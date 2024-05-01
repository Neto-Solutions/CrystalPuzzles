// import calendar_icon from '../../assets/svg/calendar_icon.svg';
import PageContainer from '../../components/page.container/Page.container';
import { Datepicker } from '../../components/datepicker/Datepicker';
import Button from '../../components/button/Button';
import styles from './Schedule.page.module.scss';

export default function SchedulePage() {
	return (
		<>
			<PageContainer.Header title="Расписание тренеров" />
			<PageContainer.Body>
				<Datepicker />
				<div className={styles['btns_wrap']}>
					<Button />
					<Button title="Составить расписание" />
				</div>
			</PageContainer.Body>
		</>
	);
}
