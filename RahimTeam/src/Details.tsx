import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Track {
  id: any;
  title: any;
  artist: {
    name: any;
    picture_big: any;
  };
  duration: number;
  link: string;
}

function Details() {
  const { id } = useParams();
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    axios
      .get(`/api/track/${id}`) // Используем прокси
      .then((response) => {
        console.log("API Response:", response.data);
        setTrack(response.data);
      })
      .catch((error) => console.error("Ошибка:", error));
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