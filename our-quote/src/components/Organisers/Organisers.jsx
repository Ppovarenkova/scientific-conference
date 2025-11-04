import styles from './Organisers.module.css';
import HomeCard from '../ui/HomeCard/HomeCard';
import Title from '../ui/Title/Title';

export default function Organisers() {
  const organisers = [
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
    <section className={styles.organisersSection}>
      <Title text="Organisers" />
      <div className={styles.cardsContainer}>
        {organisers.map((person, index) => (
          <HomeCard
            key={index}
            name={person.name}
            department={person.department}
            email={person.email}
          />
        ))}
      </div>
    </section>
  );
}