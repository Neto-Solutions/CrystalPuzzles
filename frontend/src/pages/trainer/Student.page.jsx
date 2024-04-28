import './Student.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';
export default function StudentPage() {
	return (
		<>
			<PageContainer.Header title="Чек-листы" />
			<PageContainer.Body>
				<div className="student_main_cont">
					<div className="student_header_base_cont">
						<main className="student_base_cont">
							<section className="fullname_description_cont">
								<article className="student_fullname">
									Дмитриева Анастасия Алексеевна
								</article>
								<article className="student_description_cont">
									<div className="student birthday">
										<span className="additional_header">Дата рождения :</span>{' '}
										21.03.2013
									</div>
									<div className="student address">
										<span className="additional_header">
											Адрес проживания :{' '}
										</span>
										г. Москва, ул. Донская, д. 8 стр. 1{' '}
									</div>
									<div className="student parents">
										<span className="additional_header">
											Родитель или попечитель :
										</span>{' '}
										Дмитриева Ангелина Игоревна
									</div>
									<div className="student phone_number">
										<span className="additional_header">Номер телефона :</span>{' '}
										+7 920 111 11 11{' '}
									</div>
									<div className="student peculiarities">
										<span className="additional_header">
											Особенности развития :
										</span>{' '}
									</div>
									<div className="student favorite">
										<span className="additional_header">Не любит :</span>{' '}
									</div>
								</article>
							</section>
							<section className="avatar_btns_cont">
								<article className="student_avatar_cont">
									<img className="student_avatar" />
								</article>
								<article className="student_btns_panel">
									<Button className="student_btn">Добавить в группу</Button>
									<Button className="student_btn">Вернуться</Button>
								</article>
							</section>
						</main>
					</div>
				</div>
			</PageContainer.Body>
		</>
	);
}
