import { LogReg } from '@widgets/check.in';

export default function CheckInPage({ login = false }) {
	return (
		<>
			<LogReg login={login} />
		</>
	);
}
