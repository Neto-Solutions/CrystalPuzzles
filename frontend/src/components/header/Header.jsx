import logo from "../../assets/svg/header_logo.svg"
import "./Header.css"

export default function Header() {
    return (
        <header className="checkin_header">
            <div className="logo_container">
                <img src={logo} alt="" />
            </div>
        </header>
    )
}
