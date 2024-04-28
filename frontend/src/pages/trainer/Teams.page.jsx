import './Teams.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';

export default function TeamsPage() {
	return <div>
		<PageContainer.Header title="Группы" />
			<PageContainer.Body>
				<div className="groups_cont">
					<div className="qroup_item">
						1 группа “Пингвинята”
					</div>
					<div className="qroup_item">
						3 группа “Зайки”
					</div>
					<div className="qroup_item">
						6 группа “Лисы”
					</div>
				</div>
				<div className="create_group_btn">
					<Button className="create_btn">Создать группу</Button>
				</div>
					
			
			</PageContainer.Body>
	</div>;
}
