import Page from '@components/page/Page';
import { Datepicker } from '@components/datepicker/Datepicker';
import Button from '@components/button/Button';
import styles from './Schedule.page.module.scss';

export default function SchedulePage() {
	return (
		<Page title="Расписание тренеров">
			<Datepicker />
			<div className={styles['btns_wrap']}>
				<Button />
				<Button title="Составить расписание" />
			</div>
		</Page>
	);
}
