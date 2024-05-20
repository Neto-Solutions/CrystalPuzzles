import { LogRegForm } from '@features/log.reg.form';

export default function CheckInPage({ login = false }) {
	return (
		<>
			<LogRegForm login={login} />
		</>
	);
}
