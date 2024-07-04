import { Page, Button } from '@shared/ui';
import { Table } from '@widgets/table/ui/Table';
import styles from './DesktopTableContent.module.scss';

export const DesktopTableContent = () => {
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
