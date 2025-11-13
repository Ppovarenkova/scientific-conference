import styles from "./Program.module.css";
import Title from '../ui/Title/Title';  


export default function Program() {
    return(
    <section className={styles.programSection}>
        <Title text="Program" />
        <h2 className={styles.subheading}>Registration for local participants</h2>
        <p className={styles.description}>Registration for local participants takes place at the conference venue: Thursday: from 13:00 to 14:00 + during coffee breaks between the sessions</p>
        <h2 className={styles.subheading}>Regular talks</h2>
        <p className={styles.description}>Oral presentation duration is 20 min = 15 min talk + 5 min for discussion.</p>
        <h2 className={styles.subheading}>Poster pitch talks</h2>
        <p className={styles.description}>Each poster will be briefly introduced in a short 1-3 min presentation (suitable for 1-2 slides). Discussion will happen during the following coffee break.</p>
        <div className={styles.scheduleContainer}>
            <p>Sample content. Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit autem optio dolores aspernatur commodi. Quod quos fugit quam reprehenderit dignissimos nesciunt. Molestiae sapiente animi dolor quis corrupti, adipisci molestias! Sed?</p>
        </div>
    </section>
    );
}