import './Create.group.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';

export default function CreateGroupPage() {
	return <div>
	<PageContainer.Header title="Создать группу" />
		<PageContainer.Body>
			<div className="groups_cont">
				<div className="qroup_item_create_group">
					<p>Название группы</p>
					<input className="group_item_checkbox" type="checkbox" />
				</div>
			</div>
			<div className="create_group_btn">
				<Button className="create_btn">Ученики</Button>
			</div>
				
		
		</PageContainer.Body>
</div>;
}
