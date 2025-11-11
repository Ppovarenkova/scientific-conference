import styles from './ParticipantsCard.module.css';
import avatar from '../../../assets/avatar.png';

export default function ParticipantsCard({ name, department, email }) {
  return (
    <div className={styles.card}>
      <img src={avatar} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.department}>{department}</p>
      <button className={styles.button}>TO THE ABSTRACT</button>
    </div>
  );
}
