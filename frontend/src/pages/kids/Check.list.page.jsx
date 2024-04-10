import './Check.list.page.css';
import PageContainer from '@components/page.container/Page.container';
import Card from '@components/card/Card';
import bunny from '@assets/svg/bunny.svg';
import hedgehog from '@assets/svg/hedgehog.svg';
import raccoon from '@assets/svg/raccoon.svg';

export default function CheckListPage() {
	const tempArray = Array.from({ length: 6 }, () => '1');
	return (
		<>
			<PageContainer.Header title="Чек-листы" />
			<PageContainer.Body>
				<div className="check_list_container">
					<div className="check_list_header">Чек-листы</div>
					<ul className="check_list_list">
						{tempArray.map((item, index) => (
							<>
								<li key={index} className="check_list_item">
									<span className="check_list_item_title">{item} уровень</span>
									<input className="check_list_item_checkbox" type="checkbox" />
								</li>
							</>
						))}
					</ul>
				</div>
				<Card title={'Получи награду за выполнение уровня'}>
					<div className="imgs_container">
						<img className="bunny" src={bunny} alt="" />
						<img className="hedgehog" src={hedgehog} alt="" />
						<img className="raccoon" src={raccoon} alt="" />
					</div>
				</Card>
			</PageContainer.Body>
		</>
	);
}
