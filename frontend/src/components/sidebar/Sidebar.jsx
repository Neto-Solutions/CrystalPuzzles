import './Sidebar.scss';
import avatar from '@assets/svg/avatar.svg';
import help from '@assets/svg/help_icon.svg';
import exit from '@assets/svg/exit_icon.svg';
import { Link } from 'react-router-dom';

export default function Sidebar() {
	return (
		<aside className="sidebar_container">
			<div className="sidebar_accaunt_container">
				<img src={avatar} className="sidebar_accaunt_avatar" alt="" />
				<div className="sidebar_accaunt_description">
					<span className="sidebar_accaunt_profession">методист</span>
					<span className="sidebar_accaunt_name">Антонина</span>
				</div>
			</div>
			<div className="sidebar_decor_line"></div>
			<nav className="sidebar_navigation">
				<select className="sidebar_navigation_options" defaultValue="main">
					<option className="sidebar_navigation_item" value="main">
						ГЛАВНАЯ
					</option>
					<option className="sidebar_navigation_item" value="progress">
						Графики прогресса
					</option>
					<option className="sidebar_navigation_item" value="analytics">
						Аналитика
					</option>
					<option className="sidebar_navigation_item" value="tables">
						Таблицы
					</option>
					<option className="sidebar_navigation_item" value="feedback">
						Обратная связь
					</option>
				</select>
			</nav>
			<div className="sidebar_decor_line"></div>
			<div className="sidebar_links_container">
				<Link to="./#" className="sidebar_link sidebar_link_help">
					<img src={help} className="sidebar_link_icon" alt="" />
					<span className="sidebar_link_text">Помощь</span>
				</Link>
				<Link to="./#" className="sidebar_link sidebar_link_exit">
					<img src={exit} className="sidebar_link_icon" alt="" />
					<span className="sidebar_link_text">Выйти</span>
				</Link>
			</div>
		</aside>
	);
}
