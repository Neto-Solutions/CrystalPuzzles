import React from 'react';
import './Title.scss';

export default function Title({ children, tag, className, isHeading }: any) {
	const H = tag === 'h2' ? 'h2' : 'h1';
	const headingClass = isHeading ? 'heading' : '';

	return (
		<H className={`${tag === 'h2' ? 'h2' : 'h1'} ${className} ${headingClass}`}>
			{children}
		</H>
	);
}
