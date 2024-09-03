import classNames from 'classnames';
import styles from './Modal.module.scss';

interface IModalProps {
	active: boolean;
	setActive: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
	className?: string;
}

export default function Modal({
	active,
	setActive,
	children,
	className
}: IModalProps) {
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
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}
