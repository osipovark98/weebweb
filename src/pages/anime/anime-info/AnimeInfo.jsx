import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./AnimeInfo.module.css";

function AnimeInfo() {
  const [animeData, setAnimeData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAnime = async function (signal) {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${id}/full`,
        signal
      );
      const json = await res.json();
      setAnimeData(json.data);
    };

    const controller = new AbortController();
    const signal = controller.signal;

    fetchAnime(signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    animeData && (
      <>
        <header className={`container--1200`}>
          <div className={styles.header}>
            <img
              className={styles.poster}
              src={animeData.images.jpg.large_image_url}
              alt=""
            />
            <div className={styles.headerText}>
              <h3 className={styles.title}>{animeData.title}</h3>
              <div className={styles.synopsis}>
                <p>{animeData.synopsis}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="container--1200">
          <div className={styles.anime}></div>
        </main>
      </>
    )
  );
}

export default AnimeInfo;
