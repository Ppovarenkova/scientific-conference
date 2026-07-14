import styles from './ParticipantsCard.module.css';
import avatar from '../../../assets/avatar.png';
import { useNavigate } from "react-router-dom";

export default function ParticipantsCard({ name, department, email, abstractId, photo }) {
  const navigate = useNavigate();

  function goToAbstract() {
    navigate(`/abstracts?abstract=${abstractId}`);
  }

  const imgSrc = photo
    ? (photo.startsWith("http") ? photo : `http://localhost:8000${photo}`)
    : avatar;

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <img src={imgSrc} alt={name} className={styles.image} />
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.department}>{department}</p>
        </div>
      </div>
      <button className={styles.button} onClick={goToAbstract}>
        TO THE ABSTRACT
      </button>
    </div>
  );
}