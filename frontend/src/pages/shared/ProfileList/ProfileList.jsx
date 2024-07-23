import { Page } from '@shared/ui';
import Search from './search/Search';

export default function ProfileList({ title }) {
	return (
		<Page title={title}>
			<Search />
		</Page>
	);
}
