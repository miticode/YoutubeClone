import { useEffect, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";


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


  

  const convertISO8601ToDuration = (isoDuration) => {
    const regex = /PT(\d+H)?(\d+M)?(\d+S)?/;
    const matches = isoDuration.match(regex);

    let hours = matches[1] ? parseInt(matches[1].replace('H', '')) : 0;
    let minutes = matches[2] ? parseInt(matches[2].replace('M', '')) : 0;
    let seconds = matches[3] ? parseInt(matches[3].replace('S', '')) : 0;

    let duration = '';
    if (hours > 0) {
      duration += `${hours}:`;
    }
    duration += `${minutes.toString().padStart(2, '0')}:`;
    duration += `${seconds.toString().padStart(2, '0')}`;
    return duration;
  };
  const formatViewCount = (viewCount) => {
    if (viewCount >= 1_000_000_000) {
      return (viewCount / 1_000_000_000).toFixed(1) + 'B';
    } else if (viewCount >= 1_000_000) {
      return (viewCount / 1_000_000).toFixed(1) + 'M';
    } else if (viewCount >= 1_000) {
      return (viewCount / 1_000).toFixed(1) + 'K';
    }
    return viewCount.toString();
  };
 
  return (
    <div className="video-grid">
        {api.length > 0 ? (
          api.map((videodata, index) => (
           
            <Link to={`https://www.youtube.com/watch?v=${videodata.id}`} key={index} className="video-item">
              <div className="thumbnail">
                <img src={videodata.snippet.thumbnails.medium.url} alt={videodata.snippet.title} />
                <span>{convertISO8601ToDuration(videodata.contentDetails.duration)}</span>
              </div>
              <div className="video-info">
          
                <h4 className="video-title">{videodata.snippet.title}</h4>
                <p className="channel-title">{videodata.snippet.channelTitle}</p>
                <span className="video-meta">
                <p className="view-count">{formatViewCount(videodata.statistics.viewCount)} views</p>
                <p className="published-time">{formatDistanceToNow(new Date(videodata.snippet.publishedAt))} ago</p>
                </span>
               
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
