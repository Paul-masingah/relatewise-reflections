
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Fix: Make sure we're using createRoot correctly
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Failed to find the root element");
}
