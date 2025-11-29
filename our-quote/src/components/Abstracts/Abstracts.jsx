import styles from './Abstracts.module.css';
import Title from '../ui/Title/Title';
import AbstractCard from '../ui/AbstractCard/AbstractCard';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from '../ui/Loader/Loader';

export default function Abstracts() {
    const [abstracts, setAbstracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        fetch("http://localhost:8000/api/abstracts/")
            .then(res => res.json())
            .then(data => {
                setAbstracts(data);
                setLoading(false);         // <- 🔥 ОБЯЗАТЕЛЬНО
            })
            .catch(() => setLoading(false)); // на случай ошибки
    }, []);
    // 🔥 АВТОСКРОЛЛ ПО ID ПРИ ПЕРЕХОДЕ ИЗ PARTICIPANTS
    useEffect(() => {
        if (loading) return;
        const params = new URLSearchParams(location.search);
        const abstractId = params.get("abstract");

        if (abstractId) {
            setTimeout(() => {
                const el = document.getElementById(`abstract-${abstractId}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300);
        }
    }, [location, abstracts]);

    return (
        <section className={styles.abstractsSection}>
            <Title text="Abstracts" />
            {loading ? (
                <Loader />
            ) : (
                <div className={`${styles.container} ${styles.fadeIn}`}>
                    {abstracts.map(abstract => (
                        <AbstractCard
                            key={abstract.id}
                            id={abstract.id}
                            title={abstract.title}
                            authors={abstract.authors_string}
                            department={abstract.department}
                            abstractText={abstract.text}
                            talkId={abstract.talk_id}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}