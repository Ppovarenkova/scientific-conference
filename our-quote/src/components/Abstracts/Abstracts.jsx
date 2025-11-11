import styles from './Abstracts.module.css';
import Title from '../ui/Title/Title';
import Separator from '../ui/Separator/Separator';

export default function Abstracts() { 
    return (
        <section className={styles.abstractsSection}>
            <Title text="Abstracts" />
            <div className={styles.container}></div>
        </section>
    )}