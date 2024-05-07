import Page from '@components/page/Page';
import Button from '@components/button/Button';
import styles from './Create.schedule.page.module.scss';
import { Datepicker } from '@components/calendar/datepicker/Datepicker';

export default function CreateShedulePage() {
	return (
		<Page title="Составить расписание тренеров">
			<Datepicker />
			<div className={styles['btns_wrap']}>
				<Button
					title={'Выберите тренера'}
					downArrow={'calendar_arrow_down.svg'}
				/>
				<Button
					title={'Выберите площадку'}
					downArrow={'calendar_arrow_down.svg'}
				/>
				<Button>Отправить расписание</Button>
			</div>
		</Page>
	);
}
