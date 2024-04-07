import "./User.card.css"
export default function UserCard({ name, children }) {
    return (
        <div className="user_card">
            <div className="user_card_img"></div>
            <div className="user_card_name">{name}</div>
            {children}
        </div>
    )
}
