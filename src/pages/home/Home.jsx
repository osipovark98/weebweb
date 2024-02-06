// import styles from "./Home.module.css";
import Section from "../../components/section/Section.jsx";
import AnimeCarousel from "../../components/anime-carousel/AnimeCarousel.jsx";

function Home() {
  return (
    <main>
      <Section title="top airing anime">
        <AnimeCarousel name="airing" />
      </Section>
      <Section title="most anticipated anime">
        <AnimeCarousel name="upcoming" />
      </Section>
      <Section title="most popular anime">
        <AnimeCarousel name="bypopularity" />
      </Section>
      <Section title="most favorited anime">
        <AnimeCarousel name="favorite" />
      </Section>
    </main>
  );
}

export default Home;
