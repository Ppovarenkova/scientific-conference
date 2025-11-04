import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={`container d-flex  ${styles.container}`}>
                <div className={styles.leftSide}>
                    <h1 className={styles.mainTitle}>Workshop on<br />scientific<br />computing 2025</h1>
                    <h2 className={styles.date}>May 29 - May 31, 2025. Děčín.</h2>
                </div>
                <div className={styles.rightSide}>
                    <p className={styles.text}>The international scientific colloquium is organized by the<br />Faculty of Nuclear Sciences and Physical Engineering of the<br />Czech Technical University in Prague on annual basis.<br />It is devoted to the meeting of students and young applied<br />mathematicians dealing with numerical solution of partial<br />differential equations, mathematical modelling, numerical<br />simulation of problems in technology, environment, biology<br />and computer science.
                    </p>
                </div>
            </div>
        </section>
    )
}