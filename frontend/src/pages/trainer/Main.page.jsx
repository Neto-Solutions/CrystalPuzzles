import './Main.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';


export default function MainPage() {
	return	(
	<>
		<PageContainer.Header title="Главная страница" />
		<PageContainer.Body>
			<div className="general_main_cont">
				<div className="general_header_base_cont">
					<main className="general_base_cont">
						<section className="general_notifications_cont">
							<h1 className="general_notifications_head">Уведомления</h1>
							<div className="general_notification_cont">
								<a href="#" className="general_notification_descr">Михаил выполнил все задания</a>
								<Button className="general_notification_btn">Открыть</Button>
							</div>
							<div className="general_not_decor_line"></div>
							<div className="general_notification_cont">
								<a href="#" className="general_notification_descr">Методист Мария оставила вам сообщение</a>
								<Button className="general_notification_btn">Открыть</Button>
							</div>
							<div className="general_not_decor_line"></div>
							<div className="general_notifications_btns_cont">
								<Button className="general_notifications_btns">Показать все</Button>
							</div>
						</section>
						<a className="general_timetable_cont_route">
							<section className="general_timetable_chapter">
								<div className="general_timetable_cont">
								<h1 className="general_timetable_head">Расписание</h1>
								<div className="general_timetable_item">
									<p className="general_timetable_item_descr"><span className="gen_timetable_diff_color">17/10</span>  площадка номер 1 
									<span className="gen_timetable_diff_color">14:00</span> - 5 группа</p>
								</div>
								<div className="general_timetable_decor_line"></div>
								<div className="general_timetable_item">
									<p className="general_timetable_item_descr"><span className="gen_timetable_diff_color">
										19/10</span> площадка номер 3 <span className="gen_timetable_diff_color">14:00</span> - 1 группа
									</p>
								</div>
								<div className="general_timetable_decor_line"></div>
									<div className="general_timetable_item">
										<p className="general_timetable_item_descr"><span className="gen_timetable_diff_color">21/10</span>  площадка номер 1 <span className="gen_timetable_diff_color">
											14:00</span> - 3 группа
										</p>
									</div>

								</div>
								<div className="general_timetable_btns_cont">
									<Button className="general_timetable_btn ">Сформировать чек-лист</Button>
								</div>
							</section>

						</a>
						<a  className="general_checklist_cont_route">
							<section className="general_checklist_cont">
									<h1 className="general_checklist_head">Чек-листы</h1>
									<div className="general_checklist_item">
										<span  className="general_checklist_text">1 уровень </span>
										<input className="general_checklist_checkbox" type="checkbox"></input>
									</div>
									<div className="general_checklist_item">
										<span className="general_checklist_text">1 уровень </span>
										<input className="general_checklist_checkbox" type="checkbox"></input>
									</div>
									<div className="general_checklist_item">
										<span className="general_checklist_text">1 уровень </span>
										<input className="general_checklist_checkbox" type="checkbox"></input>
									</div>
									<div className="general_checklist_item">
										<span className="general_checklist_text">1 уровень </span>
										<input className="general_checklist_checkbox" type="checkbox"></input>
									</div>
									<div className="general_checklist_item">
										<span className="general_checklist_text">1 уровень </span>
										<input className="general_checklist_checkbox" type="checkbox"></input>
									</div>
							</section>

						</a>
			
					</main>
				</div>  
			</div>
		</PageContainer.Body>
	</>)
}
