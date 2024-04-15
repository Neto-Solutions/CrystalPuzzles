import "./Root.css";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import RouterTool from "../utils/Router.tool";

export default function Root({ sidebar = false }) {
	return (
		<>
			{/* //Don`t forget to remove it later */}
			<RouterTool />
			<Header />
			{sidebar ? (
				<div className='main-container'>
					<Sidebar />
					<div>
						<Outlet />
					</div>
				</div>
			) : (
				<div>
					<Outlet />
				</div>
			)}
		</>
	);
}
