import './Card.css';

export default function Card({ title, children }) {
	return (
		<section className="card_section">
			<h1 className="card_header">{title}</h1>
			{children}
		</section>
	);
}
