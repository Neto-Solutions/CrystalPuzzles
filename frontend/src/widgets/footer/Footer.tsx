import styles from './Footer.module.scss';
import { ReactComponent as Vk } from './assets/vk.svg';
import { ReactComponent as Tg } from './assets/tg.svg';
import neto from './assets/neto.png';
import { Tag } from '@shared/ui/tag/Tag';

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<a href="/#">
				<img src={neto} alt="Netology" className={styles.netology} />
			</a>
			<Tag />
			<div className={styles.socials}>
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
