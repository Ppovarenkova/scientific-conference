import styles from './Participants.module.css';
import Title from '../ui/Title/Title';  
import ParticipantsCard from '../ui/ParticipantsCard/ParticipantsCard';

export default function Participants() {
      const participants = [
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
        <section className={styles.participantsSection}>
            <Title text="List of participants" />
            <div className={styles.cardsContainer}>
                        {participants.map((person, index) => (
                          <ParticipantsCard
                            key={index}
                            name={person.name}
                            department={person.department}
                          />
                        ))}

            </div>
        </section>
    )
}