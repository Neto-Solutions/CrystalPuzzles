import './Notification.page.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';
import ChooseButton from '@components/button/Choose.button';


export default function NotificationPage() {
	return (
	<>
	<PageContainer.Header title="Главная страница" />
	<PageContainer.Body>
	<div className="notifications_trainer_main_cont">

<div className="notifications_trainer_header_base_cont">

	<main className="notifications_trainer_base_cont">
	  <div className="notifications_trainer_cont">
		<h2 className="notifications_trainer_header">
		  Уведомления
		</h2>
		<div className="notifications_trainer_item">
		  <div className="notifications_trainer_description">
			Михаил выполнил все задания
		  </div>
		  <a className="notifications_trainer_open_link">Открыть </a>
		</div>
		<div className="notifications_trainer_item">
		  <div className="notifications_trainer_description">
			Михаил выполнил все задания
		  </div>
		  <a className="notifications_trainer_open_link">Открыть </a>
		</div>
		<div className="notifications_trainer_item">
		  <div className="notifications_trainer_description">
			Михаил выполнил все задания
		  </div>
		  <a className="notifications_trainer_open_link">Открыть </a>
		</div>
		<div className="notifications_trainer_item">
		  <div className="notifications_trainer_description">
			Михаил выполнил все задания
		  </div>
		  <a className="notifications_trainer_open_link">Открыть </a>
		</div>
		<div className="notifications_trainer_item">
		  <div className="notifications_trainer_description">
			Михаил выполнил все задания
		  </div>
		  <a className="notifications_trainer_open_link">Открыть </a>
		</div>
		<div className="notifications_trainer_item">
		  <div className="notifications_trainer_description">
			Михаил выполнил все задания
		  </div>
		  <a className="notifications_trainer_open_link">Открыть </a>
		</div>
		
	  </div>
	</main>
</div>  
</div>
	</PageContainer.Body>
		
	</>
);
}
