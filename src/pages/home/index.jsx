
import { useState } from "react";
import Content from "../../component/content"
import Header from "../../component/header"
import "./index.scss"

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearchVideos = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="home">
        <Header onSearchVideos={handleSearchVideos} />
        <Content  videos={searchResults} />
       
    </div>
  )
}

export default Home