import { Wrapper, LogReg } from './check.in';

export default function CheckInPage({ login = false }) {
	return (
		<Wrapper>
			<LogReg login={login} />
		</Wrapper>
	);
}
