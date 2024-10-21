import styles from './Footer.module.scss';
import { ReactComponent as Logo } from '@shared/assets/header/logo.svg';
import { ReactComponent as Vk } from './assets/vk.svg';
import { ReactComponent as Tg } from './assets/tg.svg';
import { useResize } from '@shared/hooks';

export default function Footer() {
	const sm = useResize('sm');
	return (
		<footer className={styles.footer}>
			<a href="https://crystalpuzzles.ru/" target="_blank" rel="noreferrer">
				<Logo height={sm ? 38 : 48} />
			</a>
			<div className={styles.socials}>
				<a
					href="https://t.me/crystallpuzzless"
					target="_blank"
					rel="noreferrer"
				>
					<Tg height={sm ? 38 : 48} />
				</a>
				<a
					href="https://vk.com/crystalpuzzlesfs"
					target="_blank"
					rel="noreferrer"
				>
					<Vk height={sm ? 38 : 48} />
				</a>
			</div>
		</footer>
	);
}
