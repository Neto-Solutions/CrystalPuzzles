import styles from './Check.list.page.module.scss';
import Page from '@shared/ui/page/Page';
import { CardLink } from '@shared/card';
import { CheckList } from '@features/check.list';

export default function CheckListPage() {
	return (
		<Page title="Чек-листы">
			<CheckList />
			<CardLink
				title="Получи награду за выполнение уровня"
				className={styles.rewart_trio}
			/>
		</Page>
	);
}
