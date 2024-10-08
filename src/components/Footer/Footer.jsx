import React from 'react';
import '../Footer/Footer.css';
import contactImage from '../../assets/images/logo.png'; 
import { useNavigate } from 'react-router-dom';



const Footer = () => {

  const navigate = useNavigate();

  const handleNavigate = () =>{
    navigate('/desarrolladores')
  }
  return (
    <div className="footer">
      <div className="footer-section">
        <h5 className='Text-Footer'><strong>Desarrolladores</strong></h5>
        <ul>
          <li>
            Camila Prado
            <a href="https://www.linkedin.com/in/camila-prd?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-linkedin"></i>
            </a>
            <a href="https://github.com/camiiprd" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-github"></i>
            </a>
          </li>
          <li>
            Mariano Godoy
            <a href="https://www.linkedin.com/in/mariano-godoy-230039329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-linkedin"></i>
            </a>
            <a href="https://github.com/Mariano-Godoy" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-github"></i>
            </a>
          </li>
          <li>
            Ramiro Sorroza
            
            <a href="http://www.linkedin.com/in/ramiro-agustin-sorroza-b3a9a328b" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-linkedin"></i>
            </a>
            <a href="https://github.com/RamiSorroza" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-github"></i>
            </a>
          </li>
          <li>
            Diego Pizarro

            <a href="https://www.linkedin.com/in/diegoandrespizarro?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-linkedin"></i>
            </a>
            <a href="https://github.com/diegoandrespizarro" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-github"></i>
            </a>
          </li>   
          <li>
            Johana Abigail Ale

            <a href="https://www.linkedin.com/in/johana-ale-8378a2317/" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-linkedin"></i>
            </a>
            <a href="https://github.com/JohanaAle" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-github"></i>
            </a>
          </li>
          <li>
            Jeremias Pedraza 

            <a href="https://www.linkedin.com/in/samuel-jeremias-pedraza-6544a3276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-linkedin"></i>
            </a>
            <a href="https://github.com/jpedraza-1" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-github"></i>
            </a>
          </li>
          <li>
           Lia Lisabet Costilla 

            <a href="https://www.linkedin.com/in/lia-liabet-costilla-a05146225?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-linkedin"></i>
            </a>
            <a href="https://github.com/12-9-1" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-github"></i>
            </a>
          </li>
          <li>
           Valentino Lencina 
            <a href="https://www.linkedin.com/in/valentino-lencina-089047329/" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-linkedin"></i>
            </a>
            <a href="https://github.com/ValeLenci" target="_blank" rel="noopener noreferrer">
              <i className="icon bi-github"></i>
            </a>
          </li>         
        </ul>   
      </div>

       <div className="footer-section">
        <img src={contactImage} alt="Contacto" className="logo-footer" />
        
      </div>
      <div className="footer-section2">
        <h5 className='Text-contact'><strong>Contacto</strong></h5>
        <p><i className="icon bi-envelope"></i> contacto@ejemplo.com</p>
        <p><i className="icon bi-telephone"></i> +54 11 1234 5678</p>
        <h5 className='footer-text'><strong>Muchas gracias por visitarnos!</strong></h5>
        <p>Conocé mas sobre nosotros presionando el siguiente botón.</p>
        <button onClick={handleNavigate} className='button-footer'><strong>Sobre Nosotros</strong></button>
      </div>
    </div>
  );
};

export default Footer;
