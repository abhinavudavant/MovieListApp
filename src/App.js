import Banner from './components/Banner';
import { MovieList  } from './features/movies';

const App = () => {
  return (
    <div>
      <Banner/>
      <main className='pt-16'>
        <MovieList year={2026}  />
      </main>
      
    </div>
  );
};

export default App;

