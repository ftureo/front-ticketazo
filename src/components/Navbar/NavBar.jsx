import React, { useContext } from 'react';
import '../NavBar/NavBar.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faPhone, faAddressBook, faSearch, faShop ,faLaptopCode} from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/images/logo.png";
import { ShoppingCardContext } from "../../contexts/ShoppingCardContext";

const NavBar = () => {
  const { cartItems } = useContext(ShoppingCardContext);
  const navigate = useNavigate(); 
 
 // Cargar el usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLoginClick = () => {
    if (user) {
      navigate('/profile'); // Redirige a la página del perfil si está logueado
    } else {
      navigate('/login'); // Redirige a la página de login si no está logueado
    }
  };

  const handleCartClick = () => {
    navigate('/carrito'); // Redirige a la página del carrito
  };
  

  return (
    <nav className="navbar">
      {/* Logo */}
      <div onClick={() => navigate('/')} className="icon navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      
      {/* Iconos de login y carrito */}
      <div className="navbar-icons">
        <div onClick={() => navigate('/dash')} className="icon">
          <FontAwesomeIcon icon={faShop} />
          <span>Dashboard</span>
        </div>
        <div onClick={() => navigate('/merch')} className="icon">
          <FontAwesomeIcon icon={faShop} />
          <span>Productos</span>
        </div>
        <div onClick={() => navigate('/desarrolladores')} className="icon">
          <FontAwesomeIcon icon={faLaptopCode} />
          <span>Sobre nosotros</span>
        </div>
        <div onClick={() => navigate('/contact')} className="icon">
          <FontAwesomeIcon icon={faAddressBook} />
          <span>Contáctanos</span>
        </div>
        <div onClick={handleLoginClick} className="icon">
          {user ? (
            <>
              <img src={user.profilePicture} alt="Perfil" className="profile-icon" /> {/* Mostrar la foto del perfil */}
              <span>{user.userName}</span> {/* Mostrar nombre si está logueado */}
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faUser} />
              <span>Ingresar!</span>
            </>
          )}
        </div>
        <div onClick={handleCartClick} className="icon">
          <FontAwesomeIcon icon={faShoppingCart} />
          <span>Carrito ({cartItems.length})</span> {/* Muestra la cantidad de artículos */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;