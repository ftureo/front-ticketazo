import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';  // Importar Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css";  // Importar Bootstrap Icons
import { BrowserRouter } from 'react-router-dom';  // Importar BrowserRouter para enrutamiento

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <StrictMode>
    <App />
  </StrictMode>,
  </BrowserRouter>
 
)
