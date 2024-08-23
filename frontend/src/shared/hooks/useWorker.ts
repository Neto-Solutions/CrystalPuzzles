import { useEffect, useState } from 'react';

export default function useWorker(fn: any) {
	const [worker, setWorker]: any = useState(null);

	useEffect(() => {
		let code = fn.toString();
		code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
		const blob = new Blob([code], { type: 'application/javascript' });
		const url = URL.createObjectURL(blob);
		setWorker(new Worker(url));
		URL.revokeObjectURL(url);

		return () => {
			worker.terminate();
			setWorker(null);
		};
	}, []);

	return worker;
}
