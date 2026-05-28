import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ColorModeProvider } from './theme/ColorModeProvider';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ColorModeProvider>
            <App />
        </ColorModeProvider>
    </StrictMode>,
);
