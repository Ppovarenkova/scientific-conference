import styles from './Header.module.css';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { Link, useLocation } from "react-router-dom";

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

  const location = useLocation();

  const handleLogoClick = (e) => {
    if (location.pathname === "/") {
      e.preventDefault(); 
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
    return (
        <Link className={styles.logo} to ="/" onClick={handleLogoClick}>
            <LogoIcon className={styles.logoIcon} />
        </Link>
    )
}

function Navbar() {
    return (
        <nav className={`nav justify-content-end gap-5 ${styles.navBar}`}>
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
            <div>
                <Link className={`nav-link ${styles.whiteLink}`} href="#">Venue</Link>
            </div>
        </nav>
    )
}