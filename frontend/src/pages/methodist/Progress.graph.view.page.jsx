import styles from './Progress.graph.view.page.module.scss';
import Page from '@components/page/Page';
import UserCard from '@components/card/user.card/User.card';
import Button from '@components/button/Button';
import { ReactComponent as Chart } from '@assets/svg/chart.svg';
import avatar from '@assets/img/methodist_img.jpg';
import CalendarButton from '@components/button/calendar';

export default function ProgressGraphViewPage() {
	return (
		<Page title="График прогресса">
			<Chart />
			<div className={styles.buttons_container}>
				<UserCard img={avatar} name="Дмитриева Анастасия Алексеевна" />

				<CalendarButton />
				<Button title="Выгрузить" />
				<Button title="Открыть в Google doc" />
			</div>
		</Page>
	);
}
