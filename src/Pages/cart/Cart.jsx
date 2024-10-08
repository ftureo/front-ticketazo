import React, { useState } from 'react';
import Swal from 'sweetalert';
import '../cart/cart.css';

const Cart = ({ cartItems, setCartItems }) => {
  const handleIncrease = (id) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
  };

  const handleDecrease = (id) => {
    const updatedItems = cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedItems);
  };
  const handleAddToCart = (newItem) => {
    // Verifica si el producto ya está en el carrito
    const existingItem = cartItems.find(item => item.id === newItem.id);
    if (existingItem) {
      handleIncrease(newItem.id); // Si ya está agregado, aumenta la cantidad
    } else {
      setCartItems(prevItems => [...prevItems, { ...newItem, quantity: 1 }]);
    }
    // Muestra alerta del producto agregado
    Swal({
      title: '¡Producto agregado!',
      text: 'Producto agregado correctamente al carrito.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  };

  const handleEmptyCart = () => {
    Swal({
      title: 'Vaciar Carrito',
      text: '¿Estás seguro de que deseas vaciar el carrito?',
      icon: 'warning',
      buttons: ['Cancelar', 'Vaciar'],
    }).then((willDelete) => {
      if (willDelete) {
        setCartItems([]); // Vaciar el carrito
        Swal('El carrito ha sido vaciado.', { icon: 'success' });
      }
    });
  };

  const handleFinalizePurchase = () => {
    Swal({
      title: 'Finalizar Compra',
      text: 'Selecciona el medio de pago:',
      content: {
        element: "select",
        attributes: {
          placeholder: "Selecciona un medio de pago",
        },
      },
      buttons: true,
    }).then((paymentMethod) => {
      if (paymentMethod) {
        Swal('Compra confirmada! Recibirás un correo de confirmación.', { icon: 'success' });
        setCartItems([]); // Limpiar el carrito
      }
    });
  };

  return (
    <div id="cart-wrapper">
      <h2 id="cart-title">Tu Carrito</h2>
      {cartItems.length === 0 ? (
        <p id="cart-message">Tu carrito está vacío.</p>
      ) : (
        <div id="items-list">
          {cartItems.map(item => (
            <div key={item.id} id="single-item">
              <img src={item.imageUrl} alt={item.title} id="item-image" />
              <div id="item-details">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>Precio: {item.price}</p>
                <div id="item-quantity">
                  <button id="quantity-button" onClick={() => handleDecrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button id="quantity-button" onClick={() => handleIncrease(item.id)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div id="cart-buttons">
        <button id="cart-button" onClick={handleEmptyCart}>Vaciar Carrito</button>
        <button id="cart-button" onClick={handleFinalizePurchase}>Finalizar Compra</button>
      </div>
    </div>
  );
};

export default Cart;
