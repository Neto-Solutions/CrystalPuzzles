import './Router.tool.css';
import checkInRoutes from '../routes/check.in.router';
import methodistRoutes from '../routes/methodist.router';
import trainerRoutes from '../routes/trainer.router';
import kidsRoutes from '../routes/kids.router';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function RouterTool() {
	const [show, setShow] = useState(true);
	const [routes, setRoutes] = useState([]);
	const navigate = useNavigate();
	const role = useSelector((state) => state.user.role);
	const dispatch = useDispatch();

	const roles = ['methodist', 'trainer', 'kids'];

	useLayoutEffect(() => {
		setRoutes(() => {
			return checkInRoutes.concat(
				(role === 'kids' && kidsRoutes) ||
					(role === 'methodist' && methodistRoutes) ||
					(role === 'trainer' && trainerRoutes)
			);
		});
	}, [role]);
	return (
		<div className="router_tool_container">
			<div className="router_tool_btn" onClick={() => setShow(!show)}></div>
			<div className={show ? 'router_tool' : 'router_tool router_tool_hide'}>
				<div className="router_tool_role_container">
					{roles.map((el, index) => (
						<>
							<div
								key={index}
								className={
									el === role
										? 'router_tool_role router_tool_role_active'
										: 'router_tool_role'
								}
								onClick={() =>
									dispatch({ type: 'SET_ROLE', payload: el }, navigate('/'))
								}
							>
								{el}
							</div>
						</>
					))}
				</div>
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
