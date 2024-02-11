/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useReducer, useRef } from "react";

import * as Icons from "@heroicons/react/16/solid";

import AnimeItem from "../../../components/anime-item/AnimeItem.jsx";

import styles from "./AnimeSearch.module.css";

// const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case "changeQuery":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          page: null,
          q: action.payload,
        },
      };
    case "toggleSFW":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          page: null,
          sfw: !state.queryParams.sfw,
        },
      };
    case "toggleApproved":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          page: null,
          approved: !state.queryParams.approved,
        },
      };
    case "changeType":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          page: null,
          type: action.payload,
        },
      };
    case "changeRating":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          page: null,
          rating: action.payload,
        },
      };
    case "changeStatus":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          page: null,
          status: action.payload,
        },
      };
    case "changePage":
      return {
        ...state,
        queryParams: {
          ...state.queryParams,
          page: action.payload,
        },
      };
    case "setAnimes":
      return {
        ...state,
        animes: [...action.payload],
      };
  }
}

function AnimeSearch() {
  const [state, dispatch] = useReducer(reducer, {
    queryParams: {
      q: "",
      type: "",
      rating: "",
      status: "",
      sfw: true,
      approved: false,
      page: null,
    },
    animes: [],
    maxPage: null,
  });
  const [isAdvancedDisplayed, setIsAdvancedDisplayed] = useState(false);
  const maxPage = useRef(null);
  const queryInputValue = useRef(null);

  useEffect(() => {
    const fetchAnimes = async function (fetchQuery, signal) {
      let response = await fetch(fetchQuery, signal);
      if (response.status === 429) {
        do {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          response = await fetch(fetchQuery, signal);
        } while (response.status !== 200);
      }
      if (response.status === 200) {
        const json = await response.json();
        maxPage.current = json.pagination.last_visible_page;
        console.log(maxPage.current);
        dispatch({ type: "setAnimes", payload: json.data });
        dispatch({ type: "changePage", payload: json.pagination.current_page });
      }
    };

    const controller = new AbortController();
    const signal = controller.signal;

    const base = `https://api.jikan.moe/v4/anime?`;
    const params = Object.entries(state.queryParams)
      .map(([key, value]) => {
        const isTruthy = Boolean(value);
        const isBoolean = typeof value === "boolean";
        return `${
          isTruthy
            ? `${isTruthy ? `${key}` : ""}` + `${isBoolean ? "" : `=${value}`}`
            : ""
        }`;
      })
      .filter((param) => param)
      .join("&");

    fetchAnimes(base + params, signal);

    return () => {
      console.log("abort");
      controller.abort();
    };
  }, [
    state.queryParams.q,
    state.queryParams.page,
    state.queryParams.sfw,
    state.queryParams.type,
  ]);

  const handlePrevPageClick = function () {
    if (state.queryParams.page === 1) return;
    dispatch({ type: "changePage", payload: state.queryParams.page - 1 });
  };

  const handleNextPageClick = function () {
    if (state.queryParams.page === maxPage.current) return;
    dispatch({ type: "changePage", payload: state.queryParams.page + 1 });
  };

  return (
    <main className="container--1200">
      <search className={styles.animeSearch}>
        <div className={styles.searchBar}>
          <input
            type="search"
            className={styles.queryInput}
            placeholder="Search anime..."
            ref={queryInputValue}
          />
          <button
            type="button"
            className={styles.searchBtn}
            onClick={() => setIsAdvancedDisplayed(!isAdvancedDisplayed)}
          >
            <Icons.AdjustmentsHorizontalIcon />
          </button>
          <button
            type="button"
            className={styles.searchBtn}
            onClick={() =>
              dispatch({
                type: "changeQuery",
                payload: queryInputValue.current.value,
              })
            }
          >
            <Icons.MagnifyingGlassIcon />
          </button>
        </div>
        <form
          className={`${styles.advancedSearchForm} ${
            isAdvancedDisplayed ? "displayed" : ""
          }`}
        >
          <div className={styles.searchField}>
            <label className={styles.searchLabel} htmlFor="nsfw-flag">
              NSFW
            </label>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="nsfw-flag"
              checked={!state.queryParams.sfw}
              onChange={() => dispatch({ type: "toggleSFW" })}
            />
          </div>
          <div className={styles.searchField}>
            <label className={styles.searchLabel} htmlFor="approved-flag">
              approved
            </label>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="approved-flag"
              checked={state.queryParams.approved}
              onChange={() => dispatch({ type: "toggleApproved" })}
            />
          </div>
          <div className={styles.searchField}>
            <label className={styles.searchLabel}>type</label>
            <select
              className={styles.select}
              name="type"
              value={state.queryParams.type}
              onChange={(e) =>
                dispatch({ type: "changeType", payload: e.target.value })
              }
            >
              <option value="">--Choose Type--</option>
              <option value="tv">tv</option>
              <option value="movie">movie</option>
              <option value="ova">ova</option>
              <option value="special">special</option>
              <option value="ona">ona</option>
              <option value="music">music</option>
              <option value="cm">cm</option>
              <option value="pv">pv</option>
              <option value="tv-special">tv special</option>
            </select>
          </div>
          <div className={styles.searchField}>
            <label className={styles.searchLabel}>rating</label>
            <select
              className={styles.select}
              name="rating"
              value={state.queryParams.rating}
              onChange={(e) =>
                dispatch({ type: "changeRating", payload: e.target.value })
              }
            >
              <option value="">--Choose Rating--</option>
              <option value="g">G - All Ages</option>
              <option value="pg">PG - Children</option>
              <option value="pg13">PG-13 - Teens 13 or older</option>
              <option value="r17">R-17+ (violence & profanity)</option>
              <option value="r">R+ - Mild Nudity</option>
              <option value="rx">Rx - Hentai</option>
            </select>
          </div>
          <div className={styles.searchField}>
            <label className={styles.searchLabel}>status</label>
            <select
              className={styles.select}
              name="status"
              value={state.queryParams.status}
              onChange={(e) =>
                dispatch({ type: "changeStatus", payload: e.target.value })
              }
            >
              <option value="">--Choose Status--</option>
              <option value="airing">Airing</option>
              <option value="upcoming">Upcoming</option>
              <option value="complete">Complete</option>
            </select>
          </div>
        </form>
      </search>
      <section className={styles.searchResults}>
        <ul className={styles.animeItemsList}>
          {state.animes.map((anime) => (
            <AnimeItem key={anime.mal_id} anime={anime} />
          ))}
        </ul>
        {state.queryParams.page && (
          <div className={styles.pageBtnBox}>
            <button
              className={styles.btnChangePage}
              onClick={handlePrevPageClick}
            >
              <Icons.ChevronLeftIcon />
            </button>
            <p className={styles.currentPageNum}>{state.queryParams.page}</p>
            <button
              className={styles.btnChangePage}
              onClick={handleNextPageClick}
            >
              <Icons.ChevronRightIcon />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default AnimeSearch;
