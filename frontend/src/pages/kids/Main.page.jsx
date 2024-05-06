import './Main.page.scss';
import { Link } from 'react-router-dom';
import reward_animal from '@assets/svg/reward_animal.svg';
import Card from '@components/card/Card';
import Page from '@components/page/Page';
import Feedback from '@components/feedback.block.kids/Feedback';
export default function KidsMainPage() {
	return (
		<Page title="Главная страница">
			<Link to="/#">
				<Card title={'Мои награды'}>
					<img className="card_image" src={reward_animal} alt="" />
				</Card>
			</Link>
			<Link to="/train">
				<Card title={'Мои тренировки'}>
					<span className="card_description">
						тренер оценил вашу тренировку
					</span>
				</Card>
			</Link>
			<Link to="/check-list">
				<Card title={'Мои чек-листы'} />
			</Link>
			<Link to="/schedule">
				<Card title={'Мои расписание на сегодня'}>
					<div className="general_kids_shedule">
						<div className="general_kids_shedule_item">
							<span className="general_kids_shedule_item_time">12:50</span>
							<span> - </span>
							<span>1 площадка,</span>
							<span>тренер - Ильина Анастасия</span>
						</div>
					</div>
				</Card>
			</Link>
			<Feedback />
		</Page>
	);
}
