import './Notification.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';

export default function NotificationPage() {
	return (
		<>
			<PageContainer.Header title="Уведомления" />
			<PageContainer.Body>
				<div className="notifications_main_cont">
					<div className="notifications_header_base_cont">
						<main className="notifications_base_cont">
							<div className="notifications_cont">
								<h2 className="notifications_header">Уведомления</h2>
								<div className="notifications_item">
									<div className="notifications_description">
										Михаил выполнил все задания
									</div>
									<Button className="notifications_open_link">Открыть </Button>
								</div>
								<div className="notifications_item">
									<div className="notifications_description">
										Михаил выполнил все задания
									</div>
									<Button className="notifications_open_link">Открыть </Button>
								</div>
								<div className="notifications_item">
									<div className="notifications_description">
										Михаил выполнил все задания
									</div>
									<Button className="notifications_open_link">Открыть </Button>
								</div>
								<div className="notifications_item">
									<div className="notifications_description">
										Михаил выполнил все задания
									</div>
									<Button className="notifications_open_link">Открыть </Button>
								</div>
								<div className="notifications_item">
									<div className="notifications_description">
										Михаил выполнил все задания
									</div>
									<Button className="notifications_open_link">Открыть </Button>
								</div>
								<div className="notifications_item">
									<div className="notifications_description">
										Михаил выполнил все задания
									</div>
									<Button className="notifications_open_link">Открыть </Button>
								</div>
							</div>
						</main>
					</div>
				</div>
			</PageContainer.Body>
		</>
	);
}
