import "./Notification.page.css"
import PageContainer from "../../components/page.container/Page.container"
import { Link } from "react-router-dom"
export default function NotificationPage() {
    return (
        <>
            <PageContainer.Header title="Уведомления" />
            <PageContainer.Body>
                <div className="notifications_met_cont">
                    <h2 className="notifications_met_header">
                        Уведомления
                    </h2>
                    <div className="notifications_met_item">
                        <div className="notifications_met_description">
                            Михаил выполнил все задания
                        </div>
                        <Link className="notifications_met_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_met_item">
                        <div className="notifications_met_description">
                            Михаил выполнил все задания
                        </div>
                        <Link className="notifications_met_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_met_item">
                        <div className="notifications_met_description">
                            Михаил выполнил все задания
                        </div>
                        <Link className="notifications_met_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_met_item">
                        <div className="notifications_met_description">
                            Михаил выполнил все задания
                        </div>
                        <Link className="notifications_met_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_met_item">
                        <div className="notifications_met_description">
                            Михаил выполнил все задания
                        </div>
                        <Link className="notifications_met_open_link">Открыть </Link>
                    </div>
                    <div className="notifications_met_item">
                        <div className="notifications_met_description">
                            Михаил выполнил все задания
                        </div>
                        <Link className="notifications_met_open_link">Открыть </Link>
                    </div>

                </div>
            </PageContainer.Body>
        </>
    )
}
