import './Root.css';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';
import RouterTool from '../utils/Router.tool';

export default function Root({ sidebar = false }) {
	return (
		<>
			<RouterTool /> {/*Don`t forget to remove it later*/}
			<Header />
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
		</>
	);
}
