import './Analytics.view.page.scss';
import { Link } from 'react-router-dom';
import calendar_icon from '@assets/svg/calendar_icon.svg';
import UserCard from '@components/user.card/User.card';
import PageContainer from '@components/page.container/Page.container';
export default function AnalyticsViewPage() {
	return (
		<>
			<PageContainer.Header title="Аналитика тренеров" />
			<PageContainer.Body>
				<UserCard name="Дмитриева Анастасия Алексеевна">
					<div className="analytic_specific_met_show_link">Показать</div>
				</UserCard>

				<div className="analytic_specific_met_trainer_comment">
					<span className="trainer_comment">Комментарий тренера</span>
				</div>
				<div className="analytic_specific_met_btns_cont">
					<Link className="analytic_specific_met_btn analytic_specific_met_btn_calendar">
						<span className="analytic_specific_met_date">
							02.10.23 - 08.10.23
						</span>
						<img
							className="analytic_specific_met_icon"
							src={calendar_icon}
							alt=""
						/>
					</Link>
					<Link className="analytic_specific_met_btn">Выгрузить</Link>
					<Link className="analytic_specific_met_btn">
						Открыть в Google doc
					</Link>
				</div>
			</PageContainer.Body>
		</>
	);
}
