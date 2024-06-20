import useResize from '@shared/hooks/useResize';
import { DetailedAnalyticsPageContent as DesktopContent } from './desktop/DetailedAnalyticsPageContent';
import { DetailedAnalyticsPageContent as MobileContent } from './mobile/DetailedAnalyticsPageContent';

export const DetailedAnalyticsPage = () => {
	const isMobile = useResize('sm');
	return <>{isMobile ? <MobileContent /> : <DesktopContent />}</>;
};
