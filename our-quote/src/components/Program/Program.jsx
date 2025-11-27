import styles from "./Program.module.css";
import Title from '../ui/Title/Title';
import ProgramDay from "./ProgramDay";
import { useEffect, useState } from "react";


export default function Program() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/program/")
            .then(res => res.json())
            .then(setData);
    }, []);

    return (
        <section className={styles.programSection}>
            <Title text="Program" />
            <h2 className={styles.subheading}>Registration for local participants</h2>
            <p className={styles.description}>Registration for local participants takes place at the conference venue: Thursday: from 13:00 to 14:00 + during coffee breaks between the sessions</p>
            <h2 className={styles.subheading}>Regular talks</h2>
            <p className={styles.description}>Oral presentation duration is 20 min = 15 min talk + 5 min for discussion.</p>
            <h2 className={styles.subheading}>Poster pitch talks</h2>
            <p className={styles.description}>Each poster will be briefly introduced in a short 1-3 min presentation (suitable for 1-2 slides). Discussion will happen during the following coffee break.</p>
            <div className={styles.scheduleContainer}>
                <div className={styles.program}>
                    {data.map(day => (
                        <ProgramDay key={day.id} day={day} />
                    ))}
                </div>
            </div>
        </section>
    );
}