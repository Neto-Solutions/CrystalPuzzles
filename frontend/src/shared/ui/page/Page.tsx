import styles from './Page.module.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setHeader } from '@store/app';

export default function Page({ title, children }: any) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setHeader(title));
	}, [title]);
	return <main className={styles.body}>{children}</main>;
}
