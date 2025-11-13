import styles from "./Schedule.module.css";
import Title from "../../Title/Title.jsx";
import ScheduleSection from "../ScheduleSection/ScheduleSection.jsx";
import ScheduleItem from "../ScheduleItem/ScheduleItem.jsx";

export default function Schedule({day}) {
      return (
    <div className={styles.schedule}>
      <Title text={day} />

      <div className={styles.box}>
        <ScheduleItem time="13:00 - 14:00" text="Registration of participants" />
        <ScheduleItem time="14:00 - 14:10" text="Opening ceremony by Radek Fučík" />
      </div>

      <ScheduleSection title="Chair: Radek Fučík">
        <ScheduleItem
          time="14:10 - 14:30"
          speaker="Tomáš Halada"
          link="TNL-SPH: Solving free surface flows with open boundaries using conservative SPH scheme"
        />
        <ScheduleItem time="14:10 - 14:30" text="Coffee break" />
      </ScheduleSection>

      <ScheduleSection title="Chair: Radek Fučík">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <ScheduleItem
              key={i}
              time="14:10 - 14:30"
              speaker="Tomáš Halada"
              link="TNL-SPH: Solving free surface flows with open boundaries using conservative SPH scheme"
            />
          ))}
        <ScheduleItem time="14:10 - 14:30" text="Social events in Děčín" />
      </ScheduleSection>
    </div>
  );
};