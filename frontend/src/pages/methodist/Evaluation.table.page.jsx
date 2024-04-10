import './Evaluation.table.page.css';
import PageContainer from '@components/page.container/Page.container';
export default function EvaluationTablePage() {
	return (
		<>
			<PageContainer.Header title="Оценочная таблица эффективности" />
			<PageContainer.Body>
				<div className="effective_table_cont">
					<div className="effective_table_first_column">
						<div className="effective_table_first_column_part effective_table_head">
							№ п/п
						</div>
						<div className="effective_table_first_column_part">1</div>
					</div>
					<div className="effective_table_second_column">
						<div className="effective_table_second_column_part  effective_table_head">
							Показатели эффективности деятельности
						</div>
						<div className="effective_table_second_column_part">
							Эффективность методического обеспечения образовательного процесса
						</div>
					</div>
					<div className="effective_table_third_column">
						<div className="effective_table_third_column_part effective_table_head">
							Критерии оценки эффективности деятельности
						</div>
						<div className="effective_table_third_column_part">
							Системность работы по совершенствованию программного обеспечения:
							ведение баз данных по программному обеспечению
						</div>
						<div className="effective_table_third_column_part">
							Подготовка образовательных программ к утверждению и лицензированию
						</div>
					</div>
					<div className="effective_table_fourth_column">
						<div className="effective_table_fourth_column_part effective_table_head">
							Количественные, качественные или объѐмные показатели
						</div>
						<div className="effective_table_fourth_column_part">
							Кол-во: 1-2 и более системность обновления Кол-во консультаций: до
							10
						</div>
						<div className="effective_table_fourth_column_part">
							Кол-во: вновь разработанных 1-2 и более
						</div>
					</div>
					<div className="effective_table_fifth_column">
						<div className="effective_table_fifth_column_part effective_table_head">
							Баллы
						</div>
						<div className="effective_table_fifth_column_part">2</div>
						<div className="effective_table_fifth_column_part">2</div>
					</div>
					<div className="effective_table_sixth_column">
						<div className="effective_table_sixth_column_part effective_table_head">
							Примечание
						</div>
						<div className="effective_table_sixth_column_part">
							Баллы суммируются
						</div>
					</div>
				</div>
				<div className="effective_table_download_btn_cont">
					<button className="effective_table_download_btn">Выгрузить</button>
				</div>
				<div className="effective_table_google_doc_link_cont">
					<button className="effective_table_google_doc_link">
						Открыть в Google doc
					</button>
				</div>
			</PageContainer.Body>
		</>
	);
}
