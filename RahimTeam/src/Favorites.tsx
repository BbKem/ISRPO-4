import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Track {
  id: any;
  title: any;
  artist: {
    name: any;
    picture_small: any;
  };
}

function Favorites() {
  const [favorites, setFavorites] = useState<Track[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id: any) => {
    const updatedFavorites = favorites.filter((track) => track.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container">
      <h1>Избранное</h1>
      <ul>
        {favorites.map((track) => (
          <li key={track.id}>
            <img src={track.artist.picture_small} alt={track.artist.name} />
            {track.title} - {track.artist.name}
            <button onClick={() => removeFromFavorites(track.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <Link to="/">На главную</Link>
    </div>
  );
}

export default Favorites;