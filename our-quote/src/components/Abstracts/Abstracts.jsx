import styles from './Abstracts.module.css';
import Title from '../ui/Title/Title';
import AbstractCard from '../ui/AbstractCard/AbstractCard';
import { useEffect, useState } from "react";

export default function Abstracts() {
    const [abstracts, setAbstracts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/abstracts/")
            .then(res => res.json())
            .then(setAbstracts);
    }, []);

    return (
        <section className={styles.abstractsSection}>
            <Title text="Abstracts" />
            <div className={styles.container}>
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
        </section>
    );
}