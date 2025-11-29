import styles from "./Program.module.css";
import Title from '../ui/Title/Title';
import ProgramDay from "./ProgramDay";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from '../ui/Loader/Loader';

export default function Program() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        fetch("http://localhost:8000/api/program/")
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (loading) return;
            const params = new URLSearchParams(location.search);
            const talkId = params.get("talk");

            if (talkId) {
                setTimeout(() => {
                    const el = document.getElementById(`talk-${talkId}`);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 300);
            }
    }, [location, data]);

    return (
        <section className={styles.programSection}>
            <Title text="Program" />
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.fadeIn}>
                    <h2 className={styles.subheading}>Registration for local participants</h2>
                    <p className={styles.description}>Registration for local participants takes place at the conference venue: Thursday: from 13:00 to 14:00 + during coffee breaks between the sessions</p>

                    <h2 className={styles.subheading}>Regular talks</h2>
                    <p className={styles.description}>Oral presentation duration is 20 min = 15 min talk + 5 min for discussion.</p>

                    <h2 className={styles.subheading}>Poster pitch talks</h2>
                    <p className={styles.description}>Each poster will be briefly introduced in a short 1–3 min presentation.</p>

                    <div className={styles.scheduleContainer}>
                        <div className={styles.program}>
                            {data.map(day => (
                                <ProgramDay key={day.id} day={day} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}