import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Movies from "./component/Movies";
import Watchlist from "./component/Watchlist";
import Banner from "./component/Banner";
import { useEffect, useState } from "react";
function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddtoWatchList = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem('moviesApp', JSON.stringify(newWatchList))
    
    setWatchList(newWatchList);
    console.log(newWatchList);
  };
  // remove watchlist button 
  let handleRemoveFromWatchList=(movieObj)=>{
    let filterWatchList =watchlist.filter((movie)=>{
      return movie.id != movieObj.id
    })
   
    setWatchList(filterWatchList)
     localStorage.setItem('moviesApp',JSON.stringify(filterWatchList))
  }

    useEffect(()=>{
      let moviesFromLocalStorage = localStorage.getItem('moviesApp')
      if (!moviesFromLocalStorage){
        return
      }
      setWatchList(JSON.parse(moviesFromLocalStorage))
    },[])


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={
              <>
                <Banner />
                <Movies watchlist={watchlist} handleAddtoWatchList={handleAddtoWatchList}  handleRemoveFromWatchList={handleRemoveFromWatchList}/>
              </>
            }
          />
          <Route path="/Watchlist" element={<Watchlist watchlist={watchlist}   setWatchList={setWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList}/>}  />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
