import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/space-grotesk';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/base.css';
import './styles/layout.css';
import './motion/gsapConfig';
import { App } from './App';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Root element #root not found.');
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

