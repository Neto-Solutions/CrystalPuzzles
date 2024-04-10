import './Choose.button.css';
import { ReactComponent as DownArrow } from '@assets/svg/calendar_arrow_down.svg';
export default function ChooseButton({
	title,
	downArrow,
	className,
	...props
}) {
	return (
		<button className={'choose_button' + ' ' + className} {...props}>
			{title}
			{downArrow && <DownArrow className="choose_button_arrow" />}
		</button>
	);
}
