import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

interface Track {
  id: number;
  title: string;
  artist: {
    name: string;
    picture_small: string;
  };
}

const API_BASE_URL = import.meta.env.DEV ? "/api" : "https://api.deezer.com";

function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.trim() === "") {
      setTracks([]);
      return;
    }

    axios
      .get(`${API_BASE_URL}/search?q=${search}`)
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data && response.data.data) {
          setTracks(response.data.data);
        } else {
          setTracks([]);
        }
      })
      .catch((error) => console.error("Ошибка при получении треков:", error));
  }, [search]);

  const addToFavorites = (track: Track) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!storedFavorites.some((fav: Track) => fav.id === track.id)) {
      storedFavorites.push(track);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    }
  };

  return (
    <div className="container">
      <h1>Список треков</h1>
      <input
        type="text"
        placeholder="Поиск трека..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            <img src={track.artist.picture_small} alt={track.artist.name} />
            <Link to={`/details/${track.id}`}>
              {track.title} - {track.artist.name}
            </Link>
            <button onClick={() => addToFavorites(track)}>Добавить в избранное</button>
          </li>
        ))}
      </ul>
      <Link to="/favorites">Избранное</Link>
    </div>
  );
}

export default Home;
