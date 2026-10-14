import React, { useEffect, useState } from "react";
import Moviecart from "./Moviecart";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({handleAddtoWatchList ,handleRemoveFromWatchList ,watchlist}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const handlePrev = () => {
    if (pageNo > 1){
      setPageNo(1);
    }
    setPageNo(pageNo - 1);
  };
  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=${pageNo}`,
      )
      .then(function (res) {
        console.log(res.data.results);
        setMovies(res.data.results);
      });
  }, [pageNo]);

  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Tranding Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-8">
        {movies.map((movieObj) => {
          return (
            <Moviecart key={movieObj.id} movieObj={movieObj}
              poster_path={movieObj.poster_path}
              name={movieObj.original_title} handleAddtoWatchList={handleAddtoWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} watchlist={watchlist}
            />
          );
        })}
      </div>
      <Pagination  pageNo={pageNo} handleNext={handleNext} handlePrev={handlePrev}/>
    </div>
  );
}

export default Movies;
