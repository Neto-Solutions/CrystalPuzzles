import React from 'react';

import styles from './ExerciseItem.module.scss';
import Checkbox from '../checkbox/Checkbox';

export default function ExerciseItem({ text, img, id }) {
	return (
		<li className={styles.component}>
			<div className={styles.number}>{id}</div>
			<div className={styles.icon_wrapper}>
				<img className={styles.icon} src={img} />
			</div>
			<span className={styles.text}>{text}</span>
			<Checkbox disabled={false} defaultChecked={true} />
		</li>
	);
}
