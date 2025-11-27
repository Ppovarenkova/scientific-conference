import styles from "./Program.module.css";

export default function Talk({ talk }) {
  const isBreak = talk.talk_type === "break" || talk.talk_type === "event";


function formatTime(timeString) {
  // "14:10:00" → ["14","10","00"]
  const [h, m] = timeString.split(":");
  return `${h}:${m}`;
}

  return (
    <div className={isBreak ? styles.break : styles.talk}>
    <div className={styles.time}>
        {formatTime(talk.start_time)} – {formatTime(talk.end_time)}
    </div>

      <div className={styles.abstractInfo}>
        <div className={styles.speaker}>{talk.speaker}</div>
        <div className={styles.title}>{talk.title}</div>
      </div>
    </div>
  );
}