import { LogReg } from '@widgets/check.in';
import { Wrapper } from '@widgets/check.in';

export default function CheckInPage({ login = false }) {
	return (
		<Wrapper>
			<LogReg login={login} />
		</Wrapper>
	);
}
