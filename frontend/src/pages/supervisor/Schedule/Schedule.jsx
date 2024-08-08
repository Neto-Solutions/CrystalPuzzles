import styles from './Schedule.module.scss';
import { Page, Button } from '@shared/ui';
import CalendarTable from '@widgets/calendar.table';

export default function ShedulePage({ edit = false }) {
	return (
		<Page title="Составить расписание тренеров">
			<CalendarTable />
			{edit ? (
				<div className={styles.buttons_container}>
					<Button title="Выберите тренера" downArrow />
					<Button title="Выберите площадку" downArrow />
					<Button title="Отправить расписание" />
				</div>
			) : null}
		</Page>
	);
}
