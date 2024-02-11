/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import * as Icons from "@heroicons/react/16/solid";

import styles from "./AnimeItem.module.css";

function AnimeItem({ anime }) {
  return (
    <li
      className={styles.anime}
      style={{
        background: `url(${anime.images.jpg.large_image_url})`,
        backgroundSize: "cover",
      }}
    >
      <Link to={`/anime/${anime.mal_id}`} className={styles.link}>
        <div className={styles.info}>
          <h3 className={styles.title}>{anime.title}</h3>
          <div className={styles.stats}>
            <p className={styles.memberCount}>{`${anime.members} members`}</p>
            <p className={styles.avgScore}>
              <span>{anime.score}</span>
              <Icons.StarIcon />
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default AnimeItem;
