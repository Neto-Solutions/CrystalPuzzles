import './Students.list.page.scss';
import PageContainer from '@components/page.container/Page.container';

export default function StudentsListPage() {
	return (
		<>
			<PageContainer.Header title="Ученики" />
			<PageContainer.Body>
				<div className="stident_list_search_cont">
					<input className="student_list_search" type="search"></input>
					<div className="student_list_search_icon"></div>
				</div>
			</PageContainer.Body>
		</>
	);
}
