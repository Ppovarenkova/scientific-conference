import styles from './Registration.module.css';
import Separator from '../ui/Separator/Separator';
import Title from '../ui/Title/Title';
import { Link } from 'react-router-dom';

export default function Registration() {
    return (
        <section className={styles.registration}> 
        <div className={styles.container}>
                    <div className={styles.leftSide}>
            <Title text="Registration" />
            <p className={styles.description}>Conference fee is free of charge, <br /></p>
            <p className={styles.strong}>accommodation is not provided</p>
            <p className={styles.strong}>Required registration data:</p>
            <ol >
              <li>Name</li>
              <li>Your contact address and e-mail</li>
              <li>Affiliation</li>
              <li>The abstract of your contribution</li>
              <li>Arrival and departure dates</li>
            </ol>
            <p className={styles.deadline}>
                Please submit your registration <br /> until April 23, 2025
            </p>
        </div>
        <div className={styles.rightSide}>
            <Link to="/registration" className={styles.button}>
            TO THE REGISTRATION FORM
          </Link>
        </div>
        </div>
        <Separator />
        </section>
    )
}