import './Train.page.css';
import PageContainer from '@components/page.container/Page.container';
export default function TrainPage() {
	const tempArray = Array.from({ length: 3 }, () => ({
		name: 'Дмитриева Анастасия Алексеевна',
		trainer: 'Анастасия',
		combination: '(жетон 1)',
		date: '12/11/22'
	}));
	return (
		<>
			<PageContainer.Header title="Тренировки" />
			<PageContainer.Body>
				{tempArray.map((item, index) => {
					return (
						<div key={index} className="train_card">
							<div className="train_card_info">
								<div className="train_card_info_name">{item.name}</div>
								<div className="train_card_info_trainer">
									<span className="train_card_info_trainer_title">Тренер:</span>
									{item.trainer}
								</div>
								<div className="train_card_info_combination">
									<span className="train_card_info_combination_title">
										Комбинация 1
									</span>
									{item.combination}
								</div>
							</div>
							<div className="train_card_date">{item.date}</div>
						</div>
					);
				})}
			</PageContainer.Body>
		</>
	);
}
