import styles from './Footer.module.scss';
// import { ReactComponent as NetologyLogo } from '@assets/socials/netology-logo.svg';
import { ReactComponent as Vk } from '@assets/socials/vk.svg';
import { ReactComponent as Tg } from '@assets/socials/tg.svg';
import { ReactComponent as Ok } from '@assets/socials/ok.svg';
import neto from '@assets/socials/neto.png';

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
