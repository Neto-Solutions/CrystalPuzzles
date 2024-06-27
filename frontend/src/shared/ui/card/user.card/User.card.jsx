import { useState } from 'react';
import Card from '../card/Card';
import useResize from '@shared/hooks/useResize';
import styles from './User.card.module.scss';

export default function UserCard({ img, name, children, showBtn = false }) {
	const [show, setShow] = useState(false);
	// const isMobile = useResize('sm');
	return (
		<Card className={styles.card_wrapper}>
			<div className={styles.card + ' ' + (show ? styles.card_show : '')}>
				<img className={styles.card_img} src={img} />
				<div className={styles.card_content}>
					<span className={styles.card_name}>{name}</span>
					{showBtn && !show && (
						<span className={styles.card_btn} onClick={() => setShow(!show)}>
							Показать
						</span>
					)}
				</div>
			</div>
			{show && (
				<div className={styles.card_description} onClick={() => setShow(!show)}>
					{children}
				</div>
			)}
		</Card>
	);
}
