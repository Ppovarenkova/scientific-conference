import styles from "./ScheduleItem.module.css";

export default function ScheduleItem({ time, title, speaker, link }) {
    return (
        <div className={styles.item}>
            <span className={styles.time}>{time}</span>
            <div className={styles.details}>
                {speaker && <span className={styles.speaker}>{speaker}</span>}
                {link ? (
                    <a href="#" className={styles.link}>
                        {link}
                    </a>
                ) : (
                    <span>{text}</span>
                )}
            </div>
        </div>
    );
}