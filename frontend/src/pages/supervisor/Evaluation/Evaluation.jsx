import styles from './Evaluation.module.scss';
import { Page, Button } from '@shared/ui';
import { Table } from '@widgets/table/ui/Table';

export default function EvaluationPage() {
	return (
		<Page title="Оценочная таблица эффективности">
			<Table />
			<div className={styles['btn_wrap']}>
				<Button>Выгрузить</Button>
				<Button>Открыть в Google doc</Button>
			</div>
		</Page>
	);
}
