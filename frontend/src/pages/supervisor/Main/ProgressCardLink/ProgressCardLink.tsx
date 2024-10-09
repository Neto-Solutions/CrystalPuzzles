import classNames from 'classnames';
import { CardLink } from '@shared/ui/card';
import styles from './ProgressCardLink.module.scss';

interface ProgressCardLinkProps {
	className?: string;
}

export const ProgressCardLink = ({ className }: ProgressCardLinkProps) => {
	return (
		<CardLink
			to="/progress"
			title="Графики прогресса"
			className={classNames(styles.progress_graph, className)}
		/>
	);
};
