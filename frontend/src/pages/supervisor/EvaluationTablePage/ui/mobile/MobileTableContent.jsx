import { Table } from '@widgets/table/ui/Table';
import { Page, Button } from '@shared/ui';
import styles from './MobileTableContent.module.scss';

export const MobileTableContent = () => {
	return (
		<Page title="Оценочная таблица эффективности">
			<div className={styles['btn_wrap']}>
				<Button>Выгрузить</Button>
				<Button>Открыть в Google doc</Button>
			</div>
			<Table />
		</Page>
	);
};
