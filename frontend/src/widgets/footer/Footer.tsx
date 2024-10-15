import styles from './Footer.module.scss';
import { ReactComponent as Vk } from './assets/vk.svg';
import { ReactComponent as Tg } from './assets/tg.svg';
import neto from './assets/neto.png';
import { useResize } from '@shared/hooks';
export default function Footer() {
	const sm = useResize('sm');
	return (
		<footer className={styles.footer}>
			<a href="/#">
				<img src={neto} alt="Netology" className={styles.netology} />
			</a>
			<div className={styles.socials}>
				<a href="/#">
					<Tg height={sm ? 38 : 48} />
				</a>
				<a href="/#">
					<Vk height={sm ? 38 : 48} />
				</a>
			</div>
		</footer>
	);
}
