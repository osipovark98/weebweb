/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

import * as Icons from "@heroicons/react/16/solid";

import styles from "./AnimeCarousel.module.css";

function AnimeCarousel({ name }) {
  const [animes, setAnimes] = useState([]);
  const clickedButton = useRef("");
  const trackRef = useRef(null);
  const buttonsRef = useRef(null);

  const initAnimes = async function () {
    let response = await fetch(
      `https://api.jikan.moe/v4/top/anime?filter=${name}`
    );
    if (response.status === 429) {
      do {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        response = await fetch(
          `https://api.jikan.moe/v4/top/anime?filter=${name}`
        );
      } while (response.status !== 200);
    }
    if (response.status === 200) {
      const json = await response.json();
      console.log(json.data);
      setAnimes(json.data.slice(0, 16));
    }
  };

  useEffect(() => {
    initAnimes();
  }, []);

  useEffect(() => {
    if (clickedButton.current === "prev") {
      clickedButton.current = "";
      const firstAnime = trackRef.current.children[0];
      trackRef.current.style.transform = `translateX(-${firstAnime.offsetWidth}px)`;
      setTimeout(() => {
        trackRef.current.style.transition = "all 0.5s";
        trackRef.current.style.transform = "";
      });
      trackRef.current.ontransitionend = () => {
        trackRef.current.style.transition = "";
        for (let button of buttonsRef.current.children) {
          button.disabled = false;
        }
      };
    }

    if (clickedButton.current === "next") {
      clickedButton.current = "";
      const lastAnime =
        trackRef.current.children[trackRef.current.children.length - 1];
      trackRef.current.prepend(lastAnime);
      trackRef.current.style.transition = "all 0.5s";
      trackRef.current.style.transform = `translateX(-${lastAnime.offsetWidth}px)`;
      trackRef.current.ontransitionend = () => {
        trackRef.current.append(lastAnime);
        trackRef.current.style.transition = "";
        trackRef.current.style.transform = "";
        for (let button of buttonsRef.current.children) {
          button.disabled = false;
        }
      };
    }
  }, [animes]);

  function onPrevClick() {
    for (let button of buttonsRef.current.children) {
      button.disabled = true;
    }
    clickedButton.current = "prev";
    setAnimes([
      animes[animes.length - 1],
      ...animes.slice(0, animes.length - 1),
    ]);
  }

  function onNextClick() {
    for (let button of buttonsRef.current.children) {
      button.disabled = true;
    }
    clickedButton.current = "next";
    setAnimes([...animes.slice(1, animes.length), animes[0]]);
  }

  const AnimeSlides = animes.map((anime) => (
    <AnimeSlide
      key={anime.mal_id}
      imageUrl={anime.images.jpg.large_image_url}
    />
  ));

  return (
    <div className={styles.animeCarousel}>
      <ul className={styles.animeTrack} ref={trackRef}>
        {AnimeSlides}
      </ul>
      <div className={styles.animeBtnContainer} ref={buttonsRef}>
        <button
          className={`${styles.animeBtn} ${styles.animeBtnPrev}`}
          onClick={onPrevClick}
        >
          <Icons.ChevronLeftIcon />
        </button>
        <button
          className={`${styles.animeBtn} ${styles.animeBtnNext}`}
          onClick={onNextClick}
        >
          <Icons.ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

function AnimeSlide({ imageUrl }) {
  return (
    <li className={styles.AnimeSlide}>
      <img className={styles.AnimeSlideImage} src={imageUrl} alt="" />
    </li>
  );
}

export default AnimeCarousel;
