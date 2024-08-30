import classNames from 'classnames';
import styles from './Tag.module.scss';

declare global {
	interface Window {
		TAG: string;
	}
}

const tag = process.env.REACT_APP_TAG || window.TAG;

interface TagProps {
	className?: string;
}

export const Tag = ({ className }: TagProps) => {
	return <span className={classNames(styles.tag, className)}>{tag}</span>;
};
