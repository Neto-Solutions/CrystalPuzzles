import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '@shared/assets/header/logo.svg';
import { selectHeader } from '@store/app';
import { useSelector } from 'react-redux';

export default function Header({ check_in = false }: any) {
	const title = useSelector(selectHeader);
	return (
		<header className={styles.header} data-check-in={check_in}>
			{check_in ? null : (
				<div className={styles.title_wrapper}>
					<h1 className={styles.title}>{title}</h1>
				</div>
			)}
			<Link to="/">
				<div className={styles.logo}>
					<Logo />
				</div>
			</Link>
		</header>
	);
}
