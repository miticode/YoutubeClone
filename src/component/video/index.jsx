import { useEffect, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";


function Video() {
  const [api, setApi] = useState([]);

  const getApi = () => {
    fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=48&regionCode=VN&key=AIzaSyCeEWGfocHlKa3v79iQPhAd5OnHMg35KMg", {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            return res.json();
        })
        .then((data) => {
            console.log('real data: ', data);
            setApi(data.items);
        })
        .catch((error) => {
            console.log(error);
        });
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <div className="video-grid">
        {api.length > 0 ? (
          api.map((videodata, index) => (
           
            <Link to={`https://www.youtube.com/watch?v=${videodata.id}`} key={index} className="video-item">
              <div className="thumbnail">
                <img src={videodata.snippet.thumbnails.medium.url} alt={videodata.snippet.title} />
              </div>
              <div className="video-info">
                <img src="" alt="" />
                <h4 className="video-title">{videodata.snippet.title}</h4>
                <p className="channel-title">{videodata.snippet.channelTitle}</p>
                <p className="view-count">{videodata.statistics.viewCount} views</p>
              </div>
            </Link>
        
          ))
        ) : (
          <p>Loading...</p>
        )}
    </div>
  );
}

export default Video;
