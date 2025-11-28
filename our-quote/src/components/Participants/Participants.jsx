import styles from './Participants.module.css';
import Title from '../ui/Title/Title';
import ParticipantsCard from '../ui/ParticipantsCard/ParticipantsCard';
import { useEffect, useState } from "react";

export default function Participants() {
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/participants/")
            .then(res => res.json())
            .then(setParticipants);
    }, []);

    return (
        <section className={styles.participantsSection}>
            <Title text="List of participants" />
            <div className={styles.cardsContainer}>
                {participants.map(person => (
                    <ParticipantsCard
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        department={person.affiliation}
                        email={person.email}
                        abstractId={person.abstract_id}
                    />
                ))}
            </div>
        </section>
    );
}