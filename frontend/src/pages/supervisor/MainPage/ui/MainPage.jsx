import useResize from '@shared/hooks/useResize';
import { DesktopMainPageContent } from './desktop/DesktopMainPageContent';
import { MobileMainPageContent } from './mobile/MobileMainPageContent';

export default function MainPage() {
	const isMobile = useResize('sm');
	return (
		<>{isMobile ? <MobileMainPageContent /> : <DesktopMainPageContent />}</>
	);
}
