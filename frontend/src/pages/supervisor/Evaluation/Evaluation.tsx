import styles from './Evaluation.module.scss';
import { Page, Button } from '@shared/ui';
import { Table } from './table/Table';

interface EvaluationPageProps {
	title: string;
}

export default function EvaluationPage({ title }: EvaluationPageProps) {
	return (
		<Page title={title}>
			<Table />
			<div className={styles['btn_wrap']}>
				<Button>Выгрузить</Button>
				<Button>Открыть в Google doc</Button>
			</div>
		</Page>
	);
}
