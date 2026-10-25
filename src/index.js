import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './features/movies/theme/ThemeProvider';

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </QueryClientProvider>
    
);


