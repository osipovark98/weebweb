/* eslint-disable react/prop-types */
import styles from "./Section.module.css";

function Section({ title, children }) {
  return (
    <section className={`${styles.section} container--1200`}>
      <h2 className={styles.sectionHeading}>
        {title[0].toUpperCase() + title.slice(1)}
      </h2>
      {children}
    </section>
  );
}

export default Section;
