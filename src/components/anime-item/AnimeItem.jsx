/* eslint-disable react/prop-types */
import styles from "./AnimeItem.module.css";

function AnimeItem({ animeInfo }) {
  return (
    <li className={styles.animeItem}>
      <a href="#" className={styles.animeItemLink}>
        <img
          src={animeInfo.images.jpg.large_image_url}
          alt="img"
          className={styles.animeItemImg}
        />
      </a>
    </li>
  );
}

export default AnimeItem;
