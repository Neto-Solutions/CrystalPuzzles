import {Link} from "react-router-dom";
import calendar_icon from "../../assets/svg/calendar_icon.svg";
import UserCard from "../../components/user.card/User.card";
import PageContainer from "../../components/page.container/Page.container";
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";
import styles from "./Analytics.view.page.module.scss";

export default function AnalyticsViewPage() {
  return (
    <>
      <Title isHeading>Аналитика</Title>
      <PageContainer.Body>
        <UserCard name='Дмитриева Анастасия Алексеевна'>
          <div className={styles.link}>Показать</div>
        </UserCard>

        <div className={styles.comment}>
          <p>Комментарий тренера</p>
        </div>
        <div className={styles["btns-content"]}>
          <Link className={`${styles.btn} ${styles.calendar}`}>
            <span className={styles.date}>02.10.23 - 08.10.23</span>
            <img className={styles["date-icon"]} src={calendar_icon} alt='' />
          </Link>
          {/* <Link className='btn'>Выгрузить</Link>
          <Link className='btn'>Открыть в Google doc</Link> */}
          <Button>Выгрузить</Button>
          <Button>Открыть в Google doc</Button>
        </div>
      </PageContainer.Body>
    </>
  );
}
