import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Profile from "./pages/profile/Profile.jsx";

import Navigation from "./components/navigation/Navigation.jsx";
import AnimeIndex from "./pages/anime/anime-index/AnimeIndex.jsx";
import AnimeSearch from "./pages/anime/anime-search/AnimeSearch.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime">
          <Route index element={<AnimeIndex />} />
          <Route path="top" element={<p>top anime</p>} />
          <Route path="search" element={<AnimeSearch />} />
        </Route>
        <Route path="/manga" element={<p>manga</p>}></Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
