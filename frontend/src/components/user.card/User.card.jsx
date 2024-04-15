import "./User.card.css";

export default function UserCard({ name, children }) {
	return (
		<div className='card'>
			<div className='img'></div>
			<div className='name'>{name}</div>
			{children}
		</div>
	);
}
