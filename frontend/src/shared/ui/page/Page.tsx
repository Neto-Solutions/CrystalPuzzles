import styles from './Page.module.scss';
import { useDispatch } from 'react-redux';
import { ReactNode, useEffect } from 'react';
import { setHeader } from '@store/app';

interface PageProps {
	title: string;
	children: ReactNode;
}

export default function Page({ title, children }: PageProps) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setHeader(title));
	}, [title]);
	return <main className={styles.body}>{children}</main>;
}
