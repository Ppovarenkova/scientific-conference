import styles from './OrginisingCommittee.module.css';
import HomeCard from '../ui/HomeCard/HomeCard';
import Separator from '../ui/Separator/Separator';
import Title from '../ui/Title/Title';

export default function OrganisingCommittee() {
    const members = [
        {
            name: 'K. Horaisová',
            department: 'Department of Software Engineering, FNSPE, Czech Technical University in Prague',
            email: 'katerina.horaisova@fjfi.cvut.cz',
        },
        {
            name: 'K. Horaisová',
            department: 'Department of Software Engineering, FNSPE, Czech Technical University in Prague',
            email: 'katerina.horaisova@fjfi.cvut.cz',
        },
        {
            name: 'K. Horaisová',
            department: 'Department of Software Engineering, FNSPE, Czech Technical University in Prague',
            email: 'katerina.horaisova@fjfi.cvut.cz',
        },
        {
            name: 'K. Horaisová',
            department: 'Department of Software Engineering, FNSPE, Czech Technical University in Prague',
            email: 'katerina.horaisova@fjfi.cvut.cz',
        },
    ];

    return (
        <section className={styles.committeeSection}>
            <div className={styles.container}>
                <Title text="Organising Committee"/>
                <div className={styles.cardsContainer}>
                    {members.map((person, index) => (
                        <HomeCard
                            key={index}
                            name={person.name}
                            department={person.department}
                            email={person.email}
                        />
                    ))}
                </div>
            </div>
            <Separator />
        </section>
    );
}