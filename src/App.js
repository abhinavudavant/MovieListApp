
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Banner from './features/movies/components/Banner';
import { MovieList } from './features/movies';
import MovieDetailsPage from './features/movies/pages/MovieDetailsPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Banner />

        <main className="pt-16">
          <Routes>
            <Route
              path="/"
              element={<MovieList year={2026} />}
            />
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;