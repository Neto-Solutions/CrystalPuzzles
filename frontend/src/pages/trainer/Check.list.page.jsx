import styles from './Check.list.page.module.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';
export default function CheckListPage() {
	const tempArray = Array.from({ length: 5 });
	return (
		<>
			<PageContainer.Header title="Чек-листы" />
			<PageContainer.Body>
				<section className={styles.avatar}>
					<img src={require('../../assets/img/methodist_img.jpg')} alt="" />
				</section>

				<section className={styles.levels}>
					<div className={styles.level}>
						Уровень:
						<span className={styles.levels_text}></span>
					</div>
					<div className={styles.place}>
						Площадка:
						<span className={styles.levels_text}>
							2- Бережковская набережная, д. 20, стр. 6
						</span>
					</div>
					{tempArray.map((_, index) => (
						<div key={index} className={styles.student}>
							Ученик:
							<span className={styles.levels_text}></span>
						</div>
					))}
				</section>

				<section className={styles.panel}>
					<div className={styles.name}>Дмитриева Анастасия Алексеевна</div>
					<Button title="Выберите учеников" downArrow />
					<Button title="Выберите группу" downArrow />
					<Button title="Выберите уровень" downArrow />
					<Button title="Отправить чек-лист" />
				</section>

				<section className={styles.exercises}>
					<div className={styles.exercises_header}>Чек-лист</div>
					{tempArray.map((_, index) => (
						<div key={index} className={styles.exercises_item}></div>
					))}
				</section>
			</PageContainer.Body>
		</>
	);
}
