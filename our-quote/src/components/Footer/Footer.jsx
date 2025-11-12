import styles from './Footer.module.css';   
import LogoIcon from '../../assets/logoWhite.png';

export default function Footer() {
    function Logo() {
        return (
            <div className={styles.logo}>
                <img className ={styles.logoIcon} src={LogoIcon} alt="Logo" />
            </div>
        )
    }
    
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.column}>
          <Logo />
          <p>
            This workshop was supported by the Grant Agency of the Czech
            Technical University in Prague, grant No. SVK 44/25/F4.
          </p>
        </div>

        <div className={styles.column}>
          <h4>Venue</h4>
          <p>
            Faculty of Nuclear Sciences and Physical Engineering, Pohraniční
            1288/1, 405 02 Děčín <br />
            and MS Teams online
          </p>
        </div>

        <div className={styles.column}>
          <h4>Conference office</h4>
          <p>
            D. Landovská, Department of Software Engineering, Faculty of Nuclear
            Sciences and Physical Engineering, Czech Technical University in
            Prague
          </p>
        </div>

        <div className={styles.column}>
          <h4>Additional information</h4>
          <p>
            URL:{" "}
            <a href="http://geraldine.fjfi.cvut.cz/wsc-2025" target="_blank">
              http://geraldine.fjfi.cvut.cz/wsc-2025
            </a>
            <br />
            Conference poster:{" "}
            <a href="#" target="_blank">
              WSC 2025 Poster
            </a>
            <br />
            Information desk: pauspetr@cvut.cz
          </p>
        </div>
      </div>

       <hr className={styles.separator} />

      <div className={`container ${styles.bottomRow}`}>
        <p className={styles.bottomText}>©2025 MMG, FNSPE CTU in Prague</p>
        <a href="#" className={styles.adminLink}>
          Administration
        </a>
      </div>
    </footer>
  );
}