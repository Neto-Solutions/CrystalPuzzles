import { Page } from '@shared/ui';
import { Button } from '@shared/ui';
import styles from './Evaluation.table.page.module.scss';

export default function EvaluationTablePage() {
	return (
		<Page title="Оценочная таблица эффективности">
			<div className={styles.table}>
				<div className={`${styles.items} ${styles['item_1']}`}>№ п/п</div>
				<div className={`${styles.items} ${styles['item_2']}`}>
					Показатели эффективности деятельности
				</div>
				<div className={`${styles.items} ${styles['item_3']}`}>
					Критерии оценки эффективности деятельности
				</div>
				<div className={`${styles.items} ${styles['item_4']}`}>
					Количественные, качественные или объѐмные показатели
				</div>
				<div className={`${styles.items} ${styles['item_5']}`}>Баллы</div>
				<div className={`${styles.items} ${styles['item_6']}`}>Примечание</div>
				<div className={`${styles.items} ${styles['item_7']}`}>1</div>
				<div className={`${styles.items} ${styles['item_8']}`}>
					Эффективность методического обеспечения образовательного процесса
				</div>
				<div className={`${styles.items} ${styles['item_9']}`}>
					<p>
						Системность работы по совершенствованию программного обеспечения:
					</p>
					<p>ведение баз данных по программному обеспечению</p>
				</div>
				<div className={`${styles.items} ${styles['item_10']}`}>
					<p>Кол-во:</p>
					<p>1-2 и более системность обновления Кол-во консультаций: до 10</p>
				</div>
				<div className={`${styles.items} ${styles['item_11']}`}>2</div>
				<div className={`${styles.items} ${styles['item_12']}`}>
					Баллы сумми руются
				</div>
				<div className={`${styles.items} ${styles['item_13']}`}>
					Подготовка образовательных программ к утверждению и лицензированию
				</div>
				<div className={`${styles.items} ${styles['item_14']}`}>
					<p>Кол-во:</p>
					<p>вновь разработанных 1-2 и более</p>
				</div>
				<div className={`${styles.items} ${styles['item_15']}`}>2</div>
			</div>

			<div className={styles['btn_wrap']}>
				<Button>Выгрузить</Button>
				<Button>Открыть в Google doc</Button>
			</div>
		</Page>
	);
}
