import classNames from 'classnames';
import emoji_1 from '../../assets/gifs/sad.gif';
import emoji_2 from '../../assets/gifs/slight-smile.gif';
import emoji_3 from '../../assets/gifs/smile.gif';
import styles from './EmojiCard.module.scss';

const allImages = [emoji_1, emoji_2, emoji_3, emoji_1, emoji_2, emoji_3];

interface EmojiCardProps {
	className?: string;
}

export default function EmojiCard({ className }: EmojiCardProps) {
	return (
		<ul className={classNames(styles.wrapper, className)}>
			{allImages.map((image, index) => (
				<li key={index}>
					<img src={image} width={'80px'} />
				</li>
			))}
		</ul>
	);
}
