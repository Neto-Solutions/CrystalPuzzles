import { Link } from 'react-router-dom';
import Page from '@components/page/Page';
import shedule_progress from '@assets/svg/progress_shedule.svg';
import analitic from '@assets/svg/analitic.svg';
import Button from '@components/button/Button';
import Title from '@components/title/Title';
import styles from './Main.page.module.scss';

export default function MainPage() {
	return (
		<Page title="Главная страница">
			<Link to="/shedule_progress" className={styles['link-route']}>
				<section className={styles.content}>
					<Title tag="h2" className={styles.subtitle}>
						Графики прогресса
					</Title>
					<img className={styles.image} src={shedule_progress} alt="" />
				</section>
			</Link>

			<Link to="/analytic" className={styles['link_route']}>
				<section className={styles.content}>
					<Title tag="h2" className={styles.subtitle}>
						Аналитика
					</Title>
					<img className={styles['section_image']} src={analitic} alt="" />
				</section>
			</Link>

			<Link to="/effective_table" className={styles['link_route']}>
				<section className={styles.content}>
					<Title
						tag="h2"
						className={`${styles.subtitle} ${styles['table_subtitle']}`}
					>
						Таблицы
					</Title>
					<div className={styles['table_wrap']}>
						{[...Array(9)].map((_, index) => (
							<div key={index} className={styles['table_item']}></div>
						))}
					</div>
				</section>
			</Link>

			<Link to="/notifications" className={styles['link-route']}>
				<section className={styles['notifications_wrapper']}>
					<Title tag="h2">Уведомления</Title>
					<div className={styles['notice_wrap']}>
						{[...Array(2)].map((_, index) => (
							<div key={index} className={styles.notice}>
								<p className={styles['notice_text']}>
									Михаил выполнил все задания
								</p>
								<Button className={styles['btn_notice']}>Открыть</Button>
							</div>
						))}
						<Button className={`${styles['btn_notice']} ${styles.btn}`}>
							Показать все
						</Button>
					</div>
				</section>
			</Link>

			<Link to="/timetable_methodist" className={styles['link_route']}>
				<section className={styles['schedule_wrap']}>
					<div className={styles['content_wrap']}>
						<Title tag="h2" className={styles.subtitle}>
							Расписание
						</Title>
						{[...Array(3)].map((_, index) => (
							<div key={index} className={styles['timetable_wrap']}>
								<div className={styles['text_wrap']}>
									<p className={styles.text}>
										<span>17/10</span>
										площадка номер 1
									</p>
									<p className={styles.text}>
										<span>14:00</span>- 5 группа, тренер Дмитриева А.
									</p>
								</div>
								<div className={styles['text_line']}></div>
							</div>
						))}
					</div>

					<div className={styles['btns_wrap']}>
						<Button>Тренеры</Button>
						<Button>Ученики</Button>
					</div>
				</section>
			</Link>
		</Page>
	);
}
