import styles from './ParticipantsCard.module.css';
import avatar from '../../../assets/avatar.png';
import { useNavigate } from "react-router-dom";

export default function ParticipantsCard({ name, department, email, abstractId }) {
  const navigate = useNavigate();

  function goToAbstract() {
    navigate(`/abstracts?abstract=${abstractId}`);
  }

  return (
    <div className={styles.card}>
      <img src={avatar} alt={name} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.department}>{department}</p>
      <button className={styles.button} onClick={goToAbstract}>
        TO THE ABSTRACT
      </button>
    </div>
  );
}