import styles from './Header.module.css';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className="container d-flex justify-content-between align-items-center">
                <Logo />
                <Navbar />
            </div>
        </header>
    )
}
function Logo() {
    return (
        <Link className={styles.logo} to ="/">
            <LogoIcon className={styles.logoIcon} />
        </Link>
    )
}

function Navbar() {
    return (
        <nav className={`nav justify-content-end gap-5 ${styles.navBar}`}>
            <div className={styles.navItem}>
                <Link className={`nav-link ${styles.whiteLink}`} href="#">Registration</Link>
            </div>
            <div className={styles.navItem}>
                <Link className={`nav-link ${styles.whiteLink}`} href="#">Program</Link>
            </div>
            <div className={styles.navItem}>
                <Link className={`nav-link ${styles.whiteLink}`} to="/participants">Participants</Link>
            </div>
            <div className={styles.navItem}>
                <Link className={`nav-link ${styles.whiteLink}`} to="/abstracts">Abstracts</Link>
            </div>
            <div>
                <Link className={`nav-link ${styles.whiteLink}`} href="#">Venue</Link>
            </div>
        </nav>
    )
}