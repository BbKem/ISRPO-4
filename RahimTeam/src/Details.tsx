import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Track {
  id: number;
  title: string;
  artist: {
    name: string;
    picture_big: string;
  };
  duration: number;
  link: string;
}

const API_BASE_URL = import.meta.env.DEV ? "/api" : "https://api.deezer.com";

function Details() {
  const { id } = useParams();
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/track/${id}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setTrack(response.data);
      })
      .catch((error) => console.error("Ошибка при загрузке данных о треке:", error));
  }, [id]);

  if (!track) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{track.title}</h1>
      <img src={track.artist.picture_big} alt={track.artist.name} />
      <p>Исполнитель: {track.artist.name}</p>
      <p>Длительность: {Math.floor(track.duration / 60)}:{track.duration % 60}</p>
      <a href={track.link} target="_blank" rel="noopener noreferrer">
        Слушать на Deezer
      </a>
      <Link to="/">Назад</Link>
    </div>
  );
}

export default Details;
