import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider as Router } from 'react-router-dom';
import MainRouter from '@shared/routes';

export default function RouterProvider() {
	return <Router router={createBrowserRouter(MainRouter())} />;
}
