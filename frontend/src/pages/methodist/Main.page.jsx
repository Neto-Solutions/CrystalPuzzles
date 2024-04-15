import { Link } from "react-router-dom";
import PageContainer from "../../components/page.container/Page.container";
import shedule_progress from "../../assets/svg/progress_shedule.svg";
import analitic from "../../assets/svg/analitic.svg";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import styles from "./Main.page.module.scss";

export default function MainPage() {
	return (
		<>
			<Title isHeading>Главная страница</Title>
			<PageContainer.Body>
				<Link to='/shedule_progress' className={styles["link-route"]}>
					<section className={styles.content}>
						<Title tag='h2' className={styles.subtitle}>
							Графики прогресса
						</Title>
						<img className={styles.image} src={shedule_progress} alt='' />
					</section>
				</Link>

				<Link to='/analytic' className={styles["link-route"]}>
					<section className={styles.content}>
						<Title tag='h2' className={styles.subtitle}>
							Аналитика
						</Title>
						<img className={styles["section-image"]} src={analitic} alt='' />
					</section>
				</Link>

				<Link to='/effective_table' className={styles["link-route"]}>
					<section className={styles.content}>
						<Title
							tag='h2'
							className={`${styles.subtitle} ${styles["table-subtitle"]}`}
						>
							Таблицы
						</Title>
						<div className={styles["table-wrap"]}>
							{[...Array(9)].map((item) => (
								<div className={styles["table-item"]}></div>
							))}
						</div>
					</section>
				</Link>

				<Link to='/notifications' className={styles["link-route"]}>
					<section className={styles["notifications-wrapper"]}>
						<Title tag='h2' className={styles["title-notice"]}>
							Уведомления
						</Title>
						<div className={styles["notice-wrap"]}>
							{[...Array(2)].map((item) => (
								<div className={styles.notice}>
									<p className={styles["notice-text"]}>
										Михаил выполнил все задания
									</p>
									<Button className={styles["btn-notice"]}>Открыть</Button>
								</div>
							))}
							<Button className={`${styles["btn-notice"]} ${styles.btn}`}>
								Показать все
							</Button>
						</div>
					</section>
				</Link>

				<Link to='/timetable_methodist' className={styles["link-route"]}>
					<section className={styles["schedule-wrap"]}>
						<div className={styles["content-wrap"]}>
							<Title tag='h2' className={styles.subtitle}>
								Расписание
							</Title>
							{[...Array(3)].map((item) => (
								<div className={styles["timetable-wrap"]}>
									<div className={styles["general_met_timetable_item"]}>
										<p className={styles["general_met_timetable_item_descr"]}>
											<span className={styles["gen_timetable_diff_color"]}>
												17/10
											</span>{" "}
											площадка номер 1{" "}
											<span className={styles["gen_timetable_diff_color"]}>
												14:00
											</span>{" "}
											- 5 группа, тренер Дмитриева А.
										</p>
									</div>

									<div
										className={styles["general_met_timetable_decor_line"]}
									></div>
								</div>
							))}
						</div>

						<div className={styles['btns-wrap']}>
							<Button className={styles["general_met_timetable_btn"]}>
								Тренеры
							</Button>
							<Button className={styles["general_met_timetable_btn"]}>
								Ученики
							</Button>
						</div>
					</section>
				</Link>
			</PageContainer.Body>
		</>
	);
}
