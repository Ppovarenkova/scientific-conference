import styles from './Abstracts.module.css';
import Title from '../ui/Title/Title';
import Separator from '../ui/Separator/Separator';
import AbstractCard from '../ui/AbstractCard/AbstractCard';

export default function Abstracts() {
    const abstracts = [
        {
            title: 'Dynamics of Space Curves by Normal and Binormal Curvature',
            authors: 'Michal Beneš, Miroslav Kolář and Daniel Ševčovič',
            department: 'NSPE, CTU in Prague, FNSPE CTU Prague and Comenius University, Bratislava',
            abstractText: 'We discuss the motion of closed non-intersecting space curves by curvature in binormal and normal directions with application in vortex dynamics. We formulate the general motion law in space by binormal and normal curvature and mention its analytical properties. The finite-volume scheme allows to solve the motion numerically. We demonstrate behavior of the solution on several computational studies combining normal and binormal velocity and mutual interactions',

        },
        {
            title: 'Sample Abstract Title 1',
            authors: 'K. Horaisová, A. Novák',
            department: 'Department of Software Engineering, FNSPE, Czech Technical University in Prague',
            abstractText: 'This is a sample abstract text for the first abstract. It provides an overview of the research conducted and the findings.',
        },
        {
            title: 'Sample Abstract Title 1',
            authors: 'K. Horaisová, A. Novák',
            department: 'Department of Software Engineering, FNSPE, Czech Technical University in Prague',
            abstractText: 'This is a sample abstract text for the first abstract. It provides an overview of the research conducted and the findings.',
        }, 
        {
            title: 'Sample Abstract Title 1',
            authors: 'K. Horaisová, A. Novák',
            department: 'Department of Software Engineering, FNSPE, Czech Technical University in Prague',
            abstractText: 'This is a sample abstract text for the first abstract. It provides an overview of the research conducted and the findings.',
        },
    ]
    return (
        <section className={styles.abstractsSection}>
            <Title text="Abstracts" />
            <div className={styles.container}>
                {abstracts.map((person, index) => (
                    <AbstractCard
                        key={index}
                        title={person.title}
                        authors={person.authors}
                        department={person.department}
                        abstractText={person.abstractText}
                    />
                ))}
            </div>
        </section>
    )
}