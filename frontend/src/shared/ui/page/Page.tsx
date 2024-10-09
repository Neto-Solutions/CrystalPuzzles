import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { setHeader } from '@store/app';
import styles from './Page.module.scss';

interface PageProps {
	title: string;
	children: ReactNode;
	className?: string;
}

export default function Page({ title, children, className }: PageProps) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setHeader(title));
	}, [title]);
	return <main className={classNames(styles.body, className)}>{children}</main>;
}
