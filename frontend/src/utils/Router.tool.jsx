import './Router.tool.scss';
import checkInRoutes from '../routes/check.in.router';
import methodistRoutes from '../routes/methodist.router';
import trainerRoutes from '../routes/trainer.router';
import kidRoutes from '../routes/kid.router';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RouterTool() {
	const [show, setShow] = useState(true);
	const [routes, setRoutes] = useState([]);
	const navigate = useNavigate();
	const role = useSelector((state) => state.user.role);

	useLayoutEffect(() => {
		setRoutes(() => {
			return checkInRoutes.concat(
				(role === 'kid' && kidRoutes) ||
					(role === 'methodist' && methodistRoutes) ||
					(role === 'trainer' && trainerRoutes)
			);
		});
	}, [role]);
	return (
		<div className="router_tool_container">
			<div className="router_tool_btn" onClick={() => setShow(!show)}></div>
			<div className={show ? 'router_tool' : 'router_tool router_tool_hide'}>
				<div className="router_tool_routes_container">
					{routes.map((el, index) => (
						<>
							<div
								key={index}
								className="router_tool_route"
								onClick={() => navigate(el.path)}
							>
								{el.path}
							</div>
						</>
					))}
				</div>
			</div>
		</div>
	);
}
