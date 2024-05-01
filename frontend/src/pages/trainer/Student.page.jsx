import './Student.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';
export default function StudentPage() {
	return (
		<>
			<PageContainer.Header title="Чек-листы" />
			<PageContainer.Body>
				<section className="fullname_description_cont">
					<article className="student_fullname">
						Дмитриева Анастасия Алексеевна
					</article>
					<article className="student_description_cont">
						<div className="">
							<span className="additional_header">Дата рождения :</span>{' '}
							21.03.2013
						</div>
						<div className="">
							<span className="additional_header">Адрес проживания : </span>
							г. Москва, ул. Донская, д. 8 стр. 1{' '}
						</div>
						<div className="">
							<span className="additional_header">
								Родитель или попечитель :
							</span>{' '}
							Дмитриева Ангелина Игоревна
						</div>
						<div className="">
							<span className="additional_header">Номер телефона :</span> +7 920
							111 11 11{' '}
						</div>
						<div className="">
							<span className="additional_header">Особенности развития :</span>{' '}
						</div>
						<div className="">
							<span className="additional_header">Не любит :</span>{' '}
						</div>
					</article>
				</section>
				<section className="avatar_btns_cont">
					<article className="student_avatar_cont">
						<img className="student_avatar" />
					</article>
					<article className="student_btns_panel">
						<Button title="Добавить в группу" />
						<Button title="Вернуться" />
					</article>
				</section>
			</PageContainer.Body>
		</>
	);
}
