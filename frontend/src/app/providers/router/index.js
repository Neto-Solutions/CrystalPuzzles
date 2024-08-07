import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider as Router } from 'react-router-dom';
import { MainRouter } from '@shared/routes';
import { useSelector } from 'react-redux';
import { selectProfile } from '@store/profile';

export default function RouterProvider() {
	const { role } = useSelector(selectProfile);
	return <Router router={createBrowserRouter(MainRouter(role))} />;
}
