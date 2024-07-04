import useResize from '@shared/hooks/useResize';
import { DesktopContent } from './desktop/DesktopContent';
import { MobileContent } from './mobile/MobileContent';

export const DetailedAnalyticsPage = () => {
	const isMobile = useResize('sm');
	return <>{isMobile ? <MobileContent /> : <DesktopContent />}</>;
};
