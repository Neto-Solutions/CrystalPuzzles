import './Main.page.css';
import { Link } from 'react-router-dom';
import reward_animal from '@assets/svg/reward_animal.svg';
import Card from '@components/card/Card';
import PageContainer from '@components/page.container/Page.container';
export default function KidsMainPage() {
	return (
		<>
			<PageContainer.Header title="Главная страница" />
			<PageContainer.Body>
				<Link to="/#" className="general_kids_link">
					<Card title={'Мои награды'}>
						<img className="card_image" src={reward_animal} alt="" />
					</Card>
				</Link>
				<Link to="/#" className="general_kids_link">
					<Card title={'Мои тренировки'}>
						<span className="card_description">
							тренер оценил вашу тренировку
						</span>
					</Card>
				</Link>
				<Link to="/#" className="general_kids_link">
					<Card title={'Мои чек-листы'} />
				</Link>
				<Link to="/#" className="general_kids_link">
					<Card title={'Мои расписание на сегодня'}>
						<div className="general_kids_shedule">
							<div className="general_kids_shedule_item">
								<span className="general_kids_shedule_item_time">12:50</span>
								<span> - </span>
								<span>1 площадка,</span>
								<span>тренер - Ильина Анастасия</span>
							</div>
							<div className="general_kids_shedule_item">
								<span className="general_kids_shedule_item_time">14:50</span>
								<span> - </span>
								<span>1 площадка,</span>
								<span>тренер - Ильина Анастасия</span>
							</div>
						</div>
					</Card>
				</Link>
				<div className="">
					<form className="general_kids_form" action="#">
						<h1 className="card_header">Оставить комментарий тренеру</h1>
						<textarea className="general_kids_form_textarea"></textarea>
					</form>
					<div className="general_kids_form_btn">Отправить комментарий</div>
				</div>
			</PageContainer.Body>
		</>
	);
}
