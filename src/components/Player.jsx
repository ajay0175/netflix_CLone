import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apidata, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDMwYzZhODAxOTkyMTU5NjU4YjY2NmNmZTljODBhOCIsIm5iZiI6MTcyMDE3ODYzMS4zOTgzMjYsInN1YiI6IjYzY2E4YzE5MDM5OGFiMDA4NjMyODA0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6rY9KtbQNLG5tUJMrDBC_HUODOS2YTqTCesQkSTbpGU",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <>
      <div className="player w-screen h-screen  flex flex-col justify-center items-center">
        <div className="backButton absolute top-5 left-5 z-10">
          <BsArrowLeft className="text-4xl cursor-pointer text-white" onClick={() => {navigate(-2)}}></BsArrowLeft>
        </div>
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apidata.key}`}
          frameBorder="0"
          title="trailers"
          allowFullScreen
          className="rounded"
        ></iframe>
        <div className="trailerInfo text-white flex items-center justify-between w-[90%]">
          <p>{apidata.published_at.slice(0, 10)}</p>
          <p>{apidata.name}</p>
          <p>{apidata.type}</p>
        </div>
      </div>
    </>
  );
};

export default Player;
