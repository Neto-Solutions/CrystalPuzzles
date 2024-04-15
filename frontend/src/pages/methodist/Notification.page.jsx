import PageContainer from "../../components/page.container/Page.container";
import {Link} from "react-router-dom";
import Title from "../../components/title/Title";
import styles from "./Notification.page.module.scss";

export default function NotificationPage() {
  return (
    <>
      <Title isHeading>Уведомления</Title>
      <PageContainer.Body>
        <div className={styles["notifications_met_cont"]}>
          <h2 className={styles["notifications_met_header"]}>Уведомления</h2>
          <div className={styles["notifications_met_item"]}>
            <div className={styles["notifications_met_description"]}>
              Михаил выполнил все задания
            </div>
            <Link className={styles["notifications_met_open_link"]}>
              Открыть{" "}
            </Link>
          </div>
          <div className={styles["notifications_met_item"]}>
            <div className={styles["notifications_met_description"]}>
              Михаил выполнил все задания
            </div>
            <Link className={styles["notifications_met_open_link"]}>
              Открыть{" "}
            </Link>
          </div>
          <div className={styles["notifications_met_item"]}>
            <div className={styles["notifications_met_description"]}>
              Михаил выполнил все задания
            </div>
            <Link className={styles["notifications_met_open_link"]}>
              Открыть{" "}
            </Link>
          </div>
          <div className={styles["notifications_met_item"]}>
            <div className={styles["notifications_met_description"]}>
              Михаил выполнил все задания
            </div>
            <Link className={styles["notifications_met_open_link"]}>
              Открыть{" "}
            </Link>
          </div>
          <div className={styles["notifications_met_item"]}>
            <div className={styles["notifications_met_description"]}>
              Михаил выполнил все задания
            </div>
            <Link className={styles["notifications_met_open_link"]}>
              Открыть{" "}
            </Link>
          </div>
          <div className={styles["notifications_met_item"]}>
            <div className={styles["notifications_met_description"]}>
              Михаил выполнил все задания
            </div>
            <Link className={styles["notifications_met_open_link"]}>
              Открыть{" "}
            </Link>
          </div>
        </div>
      </PageContainer.Body>
    </>
  );
}
