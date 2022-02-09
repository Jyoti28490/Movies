import './App.css';
import { useState, useEffect } from 'react';
import Movie from './Components/Movie/Movie';
import Filter from './Components/Filter/Filter';
import { motion } from 'framer-motion';

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=81d10c99c9ae8d59a80e92781bd7fdf7&language=en-US&page=1'
    );
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
    // console.log(movies.results);
  };

  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
        filtered={filtered}
      />
      <motion.div layout className="popular-movies">
        {filtered.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </motion.div>
    </div>
  );
}

export default App;
