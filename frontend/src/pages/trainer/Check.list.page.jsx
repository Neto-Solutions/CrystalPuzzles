import './Check.list.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';
import ChooseButton from '@components/button/Choose.button';
export default function CheckListPage() {
	return (
		<>
			<PageContainer.Header title="Чек-листы" />
			<PageContainer.Body>
				<div className="checklist_main_cont">
					<div className="checklist_header_base_cont">
						<main className="checklist_base_cont">
							<section className="checklist_avatar_cont">
								<img className="checklist_avatar" />
							</section>
							<section className="checklicst_levels_cont">
								<div className="checklicst_level">Уровень:</div>
								<div className="checklicst_area">
									Площадка:{' '}
									<span className="checklicst_trainer_area_descpition">
										2- Бережковская набережная, д. 20, стр. 6
									</span>
								</div>
								<div className="checklicst_student">Ученик:</div>
								<div className="checklicst_student">Ученик:</div>
								<div className="checklicst_student">Ученик:</div>
								<div className="checklicst_student">Ученик:</div>
								<div className="checklicst_student">Ученик:</div>
							</section>
							<section className="checklicst_choose_panel">
								<div className="checklicst_fullname">
									Дмитриева Анастасия Алексеевна
								</div>
								<ChooseButton
									className="checklicst_choose_student"
									title="Выберите учеников"
									downArrow
								/>
								<ChooseButton
									className="checklicst_choose_group"
									title="Выберите группу"
									downArrow
								/>
								<ChooseButton
									className="checklicst_choose_level"
									title="Выберите уровень"
									downArrow
								/>
								<Button>Отправить чек-лист</Button>
							</section>
							<section className="checklist_exercises_cont">
								<div className="checklist_exercises_head">Чек-лист</div>
								<div className="checklist_exercise_cont"></div>
								<div className="checklist_exercise_cont"></div>
								<div className="checklist_exercise_cont"></div>
								<div className="checklist_exercise_cont"></div>
							</section>
						</main>
					</div>
				</div>
			</PageContainer.Body>
		</>
	);
}
