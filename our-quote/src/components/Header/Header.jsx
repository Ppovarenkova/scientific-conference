import styles from './Header.module.css';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';

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
        <div className={styles.logo}>
            <LogoIcon className={styles.logoIcon} />
        </div>
    )
}

function Navbar() {
    return (
        <nav className={`nav justify-content-end gap-5 ${styles.navBar}`}>
            <div className={styles.navItem}>
                <a className={`nav-link ${styles.whiteLink}`} href="#">Registration</a>
            </div>
            <div className={styles.navItem}>
                <a className={`nav-link ${styles.whiteLink}`} href="#">Program</a>
            </div>
            <div className={styles.navItem}>
                <a className={`nav-link ${styles.whiteLink}`} href="#">Participants</a>
            </div>
            <div className={styles.navItem}>
                <a className={`nav-link ${styles.whiteLink}`} href="#">Abstracts</a>
            </div>
            <div>
                <a className={`nav-link ${styles.whiteLink}`} href="#">Venue</a>
            </div>
        </nav>
    )
}