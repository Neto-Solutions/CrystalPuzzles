import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '@assets/logo.svg';

export default function Header() {
	return (
		<header className={styles.header}>
			<Link to="/">
				<div className={styles.logo}>
					<Logo />
				</div>
			</Link>
		</header>
	);
}
