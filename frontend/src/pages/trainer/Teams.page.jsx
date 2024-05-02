import styles from './Teams.page.module.scss';
import PageContainer from '@components/page.container/Page.container';
import Button from '@components/button/Button';

export default function TeamsPage() {
	const tempArray = [
		{ number: '1', name: 'Пингвинята' },
		{ number: '3', name: 'Зайки' },
		{ number: '6', name: 'Лисы' }
	];
	return (
		<div>
			<PageContainer.Header title="Группы" />
			<PageContainer.Body>
				<div className={styles.container}>
					{tempArray.map((item) => (
						<div className={styles.group} key={item.number}>
							{item.number} группа {item.name}
						</div>
					))}
				</div>
				<Button title="Создать группу" width="347px" height="57px" />
			</PageContainer.Body>
		</div>
	);
}
