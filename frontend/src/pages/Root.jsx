import './Root.scss';
import { Outlet } from 'react-router-dom';
import Header from '@components/header/Header';
import Sidebar from '@components/sidebar/Sidebar';
import RouterTool from '@utils/Router.tool';
import { Suspense } from 'react';

export default function Root({ sidebar = false }) {
	return (
		<>
			{/* <RouterTool /> */}
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<div className="app_container">
					{sidebar ? (
						<>
							<Sidebar />
							<div className="page_container">
								<Outlet />
							</div>
						</>
					) : (
						<>
							<Outlet />
						</>
					)}
				</div>
			</Suspense>
		</>
	);
}
