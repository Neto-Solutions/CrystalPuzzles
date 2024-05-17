import styles from './Footer.module.scss';
import { ReactComponent as Vk } from '../assets/vk.svg';
import { ReactComponent as Tg } from '../assets/tg.svg';
import { ReactComponent as Ok } from '../assets/ok.svg';
import neto from '../assets/neto.png';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<a href="/#">
				<img src={neto} alt="Netology" className={styles.netology} />
			</a>
			<div className={styles.socials}>
				<a href="/#">
					<Ok />
				</a>
				<a href="/#">
					<Tg />
				</a>
				<a href="/#">
					<Vk />
				</a>
			</div>
		</footer>
	);
}
