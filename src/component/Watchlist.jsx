import React, { useEffect, useState } from "react";
import genreids from "../Utility/genre";
function Watchlist({watchlist , setWatchList ,handleRemoveFromWatchList}) {
  const[search , setSearch]=useState('')
 const[genreList, setGenreList]=useState(['All Genres'])
 const [currGenre, setCurrGenre]= useState('All Genres')
 
 
  let handleSearch =(e)=>{
    setSearch(e.target.value)
  }

  let handleFilter=(genre)=>{
    setCurrGenre(genre)
  }

  //rating function 
  let sortIncreasing=()=>{
   let sortedIncreaing= watchlist.sort((movieA, movieB)=>{
     return movieA.vote_average-movieB.vote_average
    })
setWatchList([...sortedIncreaing])

  }
  let sortDecreasing=()=>{
   let sortedDecreaing=  watchlist.sort((movieA, movieB)=>{
     return movieB.vote_average-movieA.vote_average
})
setWatchList([...sortedDecreaing])
  }
  //genre filter 
  useEffect(()=>{
    let temp=watchlist.map((movieObj)=>{
      return genreids[movieObj.genre_ids[0]]
    })
    temp=new Set(temp)
    setGenreList(['All Genres', ...temp])
    console.log(temp)
  },[watchlist])


  return (
  
  <>
<div className="flex justify-center flex-wrap m-4">
  {genreList.map((genre) => {
    return (
 <div key={genre} onClick={()=>handleFilter(genre)}
 className={currGenre==genre?'bg-blue-400 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center mx-4' : 'bg-gray-400/50 flex justify-center h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center mx-4'}>
        {genre}
      </div>
    )
  })}
</div>
      <div className="flex justify-center my-4">
        <input onChange={handleSearch} value={search}
          type="text"
          placeholder="Search Movies"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
        />
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center ">
          <thead className="border-b-2 ">
            <tr>
              <th>Name</th>
             <th className="flex justify-center">
              <span  onClick={ sortIncreasing} className="p-2"> <i className="fa-solid fa-arrow-up"></i></span>
               <span className="p-2">Rating</span>
              <span onClick={sortDecreasing} className="p-2"> <i className="fa-solid fa-arrow-down"></i></span>
             </th> 
              <th>Popularity</th>
              <th> genre </th>
              
            </tr>
          </thead>
          <tbody>
            {watchlist?.filter((movieObj)=>{
              if(currGenre=='All Genres'){
                return true
              }else{
                return genreids[movieObj.genre_ids[0]]==currGenre;
              }
            }).filter((movieObj)=>{
              return movieObj.title.toLowerCase().includes(search.toLocaleLowerCase())
            }).map((movieObj)=>{
              return <tr key={movieObj.id}  className="border-b-2">
              <td className="flex items-center px-6 py-4">
                <img
                  className="h-[6rem] w-[10rem]"
                  src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
                />
                <div className="mx-4">{movieObj.title || movieObj.name}</div>
              </td>
              <td>{movieObj.vote_average || "8.5"}</td>
              <td>{movieObj.popularity ? Math.round(movieObj.popularity) : "9"}</td>
              <td>{genreids[movieObj.genre_ids[0]]}</td>
              <td onClick={()=>handleRemoveFromWatchList(movieObj)} className="text-red-800">Delete</td>  
            </tr>
           
            })}
            
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Watchlist;
