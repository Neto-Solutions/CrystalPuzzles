import styles from './Reward.module.scss';
export default function RewardsPopup({ onHide} : any) {
	return (
		<div className={styles.container} onClick={onHide}>
			<div className={styles.popup} onClick={(e) => e.stopPropagation()}>
				<header>Коллекция наград</header>
			</div>
		</div>
	);
}
