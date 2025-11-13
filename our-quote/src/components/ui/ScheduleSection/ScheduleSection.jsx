import styles from './ScheduleSection.module.css';

export default function ScheduleSection({ title, children }) {
    return (
        <div className={styles.section}>
            <p className={styles.title}>{title}</p>
            <div className={styles.content}>{children}</div>
        </div>
    )
}