import './Main.page.css';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/page.container/Page.container';
import shedule_progress from '../../assets/svg/progress_shedule.svg';
import analitic from '../../assets/svg/analitic.svg';
export default function MainPage() {
	return (
		<>
			<PageContainer.Header title="Главная страница" />
			<PageContainer.Body>
				<Link
					to="/shedule_progress"
					className="general_met_progress_schedule_cont_route"
				>
					<section className="general_met_progress_schedule_cont">
						<h1 className="general_met_progress_shedule_head">
							Графики прогресса
						</h1>
						<img
							className="general_met_progress_image"
							src={shedule_progress}
							alt=""
						/>
					</section>
				</Link>
				<Link to="/analytic" className="general_met_analytic_cont_route">
					<section className="general_met_analitic_cont">
						<h1 className="general_met_analitic_head">Аналитика</h1>
						<img
							className="general_met_analitic_shedule"
							src={analitic}
							alt=""
						/>
					</section>
				</Link>
				<Link to="/effective_table" className="general_met_table_cont_route">
					<section className="general_met_table_cont">
						<h1 className="general_met_table_head">Таблицы</h1>
						<div className="general_met_table_part"></div>
						<div className="general_met_table_part"></div>
						<div className="general_met_table_part"></div>
						<div className="general_met_table_part"></div>
						<div className="general_met_table_part"></div>
						<div className="general_met_table_part"></div>
						<div className="general_met_table_part"></div>
						<div className="general_met_table_part"></div>
						<div className="general_met_table_part"></div>
					</section>
				</Link>
				<Link
					to="/notifications"
					className="general_met_notifications_cont_route"
				>
					<section className="general_met_notifications_cont">
						<h1 className="general_met_notifications_head">Уведомления</h1>
						<div className="general_met_notification_cont">
							<div className="general_met_notification_descr">
								Михаил выполнил все задания
							</div>
							<button className="general_met_notification_btn">Открыть</button>
						</div>
						<div className="general_met_not_decor_line"></div>
						<div className="general_met_notification_cont">
							<div className="general_met_notification_descr">
								Методист Мария оставила вам сообщение
							</div>
							<button className="general_met_notification_btn">Открыть</button>
						</div>
						<div className="general_met_not_decor_line"></div>
						<div className="general_met_notifications_btns_cont">
							<button className="general_met_notifications_btns">
								Показать все
							</button>
						</div>
					</section>
				</Link>

				<Link
					to="/timetable_methodist"
					className="general_met_timetable_cont_route"
				>
					<section className="general_met_timetable_chapter">
						<div className="general_met_timetable_cont">
							<h1 className="general_met_timetable_head">Расписание</h1>
							<div className="general_met_timetable_item">
								<p className="general_met_timetable_item_descr">
									<span className="gen_timetable_diff_color">17/10</span>{' '}
									площадка номер 1{' '}
									<span className="gen_timetable_diff_color">14:00</span> - 5
									группа, тренер Дмитриева А.
								</p>
							</div>
							<div className="general_met_timetable_decor_line"></div>
							<div className="general_met_timetable_item">
								<p className="general_met_timetable_item_descr">
									<span className="gen_timetable_diff_color">19/10</span>{' '}
									площадка номер 3{' '}
									<span className="gen_timetable_diff_color">14:00</span> - 1
									группа, тренер Матвеева И.
								</p>
							</div>
							<div className="general_met_timetable_decor_line"></div>
							<div className="general_met_timetable_item">
								<p className="general_met_timetable_item_descr">
									<span className="gen_timetable_diff_color">21/10</span>{' '}
									площадка номер 1{' '}
									<span className="gen_timetable_diff_color">14:00</span> - 3
									группа, тренер Ильина О.
								</p>
							</div>
							<div className="general_met_timetable_decor_line"></div>
						</div>
						<div className="general_met_timetable_btns_cont">
							<button className="general_met_timetable_btn trainer">
								Тренеры
							</button>
							<button className="general_met_timetable_btn student">
								Ученики
							</button>
						</div>
					</section>
				</Link>
			</PageContainer.Body>
		</>
	);
}
