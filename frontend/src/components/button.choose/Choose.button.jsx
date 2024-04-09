import './Choose.button.css';
import { ReactComponent as DownArrow } from '../../assets/svg/calendar_arrow_down.svg';
export default function ChooseButton() {
	return (
		<button className="choose_button">
			Выберите тренера
			<DownArrow className="choose_button_arrow" />
		</button>
	);
}
