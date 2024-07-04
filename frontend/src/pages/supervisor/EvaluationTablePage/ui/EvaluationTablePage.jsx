import useResize from '@shared/hooks/useResize';
import { DesktopTableContent } from './decktop/DesktopTableContent';
import { MobileTableContent } from './mobile/MobileTableContent';

export const EvaluationTablePage = () => {
	const isMobile = useResize('sm');
	return <>{isMobile ? <MobileTableContent /> : <DesktopTableContent />}</>;
};
