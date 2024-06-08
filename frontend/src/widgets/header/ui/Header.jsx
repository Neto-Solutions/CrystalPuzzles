import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '@shared/assets/header/logo.svg';

export default function Header({ check_in = false }) {
	return (
		<header className={styles.header} data-check-in={check_in}>
			<Link to="/">
				<div className={styles.logo}>
					<Logo />
				</div>
			</Link>
		</header>
	);
}
