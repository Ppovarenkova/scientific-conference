import styles from './AbstractCard.module.css';

export default function AbstractCard({ title, authors,department, abstractText }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.authors}>{authors}</p>
      <p className={styles.department}>{department}</p>
      <hr className={styles.separator} />
      <p className={styles.abstractText}>{abstractText}</p>
      <button className={styles.button}>TO THE PROGRAM</button>
    </div>
  );
}





