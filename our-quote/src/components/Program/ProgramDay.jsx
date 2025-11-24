import Session from "./Session";
import styles from "./Program.module.css";

export default function ProgramDay({ day }) {
  return (
    <div className={styles.day}>
      <h2 className={styles.date}>
        {new Date(day.date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric"
        })}
      </h2>

      {day.sessions.map(s => (
        <Session key={s.id} session={s} />
      ))}
    </div>
  );
}