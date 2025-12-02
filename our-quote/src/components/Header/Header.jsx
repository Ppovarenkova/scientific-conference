import styles from './Header.module.css';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container d-flex justify-content-between align-items-center ${styles.inner}`}>
                <Logo />
                <Navbar />
            </div>
        </header>
    )
}

function Logo() {
    const location = useLocation();

    const handleLogoClick = (e) => {
        if (location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Link className={styles.logo} to="/" onClick={handleLogoClick}>
            <LogoIcon className={styles.logoIcon} />
        </Link>
    );
}

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    let timeout;

    const open = () => {
        clearTimeout(timeout);
        setIsOpen(true);
    };

    const close = () => {
        timeout = setTimeout(() => setIsOpen(false), 250); // ← задержка закрытия
    };

    return (
        <nav className={styles.navBar}>
    <div className={styles.navList}>
        <div className={styles.navItem}>
            <Link className={`nav-link ${styles.whiteLink}`} to="/registration">Registration</Link>
        </div>

        <div className={styles.navItem}>
            <Link className={`nav-link ${styles.whiteLink}`} to="/program">Program</Link>
        </div>

        <div className={styles.navItem}>
            <Link className={`nav-link ${styles.whiteLink}`} to="/participants">Participants</Link>
        </div>

        <div className={styles.navItem}>
            <Link className={`nav-link ${styles.whiteLink}`} to="/abstracts">Abstracts</Link>
        </div>

        {/* DROPDOWN */}
        <div
            className={`${styles.navItem} ${styles.dropdownWrapper}`}
            onMouseEnter={open}
            onMouseLeave={close}
        >
            <Link className={`nav-link ${styles.whiteLink}`} to="/venue">
                Venue <span className={styles.arrow}>▼</span>
            </Link>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <Link to="/accommodation" className={styles.dropdownItem}>Accommodation</Link>
                    <Link to="/hiking" className={styles.dropdownItem}>Hiking excursion</Link>
                </div>
            )}
        </div>
    </div>
</nav>
    );
}