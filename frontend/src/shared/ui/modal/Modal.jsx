import classNames from 'classnames';
import styles from './Modal.module.scss';

export const Modal = ({ active, setActive, children, className, width }) => {
	return (
		<div
			className={classNames(
				styles.modal,
				className,
				active ? styles.active : ''
			)}
			onClick={() => setActive(false)}
		>
			<div
				className={styles.modal_content}
				width={width}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};
