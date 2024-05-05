import styles from './Schedule.module.scss';
import Title from '../title/Title';

export default function Schedule({ children }) {
	return (
		<section className={styles['schedule-wrap']}>
			<div className={styles['content-wrap']}>
				<Title tag="h2" className={styles.subtitle}>
					Расписание
				</Title>
				{[...Array(3)].map((_, index) => (
					<div key={index} className={styles['timetable-wrap']}>
						<div className={styles['general_met_timetable_item']}>
							<p className={styles['general_met_timetable_item_descr']}>
								<span className={styles['gen_timetable_diff_color']}>
									17/10
								</span>{' '}
								площадка номер 1{' '}
								<span className={styles['gen_timetable_diff_color']}>
									14:00
								</span>{' '}
								- 5 группа, тренер Дмитриева А.
							</p>
						</div>

						<div className={styles['general_met_timetable_decor_line']}></div>
					</div>
				))}
			</div>

			<div className={styles['btns-wrap']}>{children}</div>
		</section>
	);
}
