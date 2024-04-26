// import calendar_icon from '../../assets/svg/calendar_icon.svg';
import PageContainer from '../../components/page.container/Page.container';
import { Datepicker } from '../../components/datepicker/Datepicker';
import ChooseButton from '../../components/button/Choose.button';
import Button from '../../components/button/Button';
import styles from './Schedule.page.module.scss';

export default function SchedulePage() {
	return (
		<>
			<PageContainer.Header title="Расписание тренеров" />
			<PageContainer.Body>
				<Datepicker />
				<div className={styles['btns-wrap']}>
					<ChooseButton className={styles['choose-btn']}></ChooseButton>
					<Button>Составить расписание</Button>
				</div>
			</PageContainer.Body>
		</>
	);
}
