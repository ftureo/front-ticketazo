import React, { useContext, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ShoppingCart.css';
import { ShoppingCardContext } from '../../contexts/ShoppingCardContext';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity, getTotal } = useContext(ShoppingCardContext);
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const total = getTotal(); // Utilizar la función getTotal desde el contexto

  const handleRemoveClick = (itemId) => {
    setShowModal(true);
    setItemToRemove(itemId);
  };

  const confirmRemove = () => {
    removeFromCart(itemToRemove);
    setShowModal(false);
    setItemToRemove(null);
  };

  const handleIncreaseQuantity = (itemId) => {
    updateQuantity(itemId, 1); // Incrementar la cantidad
  };

  const handleDecreaseQuantity = (itemId) => {
    updateQuantity(itemId, -1); // Decrementar la cantidad
  };

  const finalizePurchase = async () => {
    console.log("Compra finalizada!");
    clearCart();
    setShowSuccessModal(true);
  };

  return (
    <div className="shopping-cart">
      <h1>Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.title} {item.type === 'event' ? '(Evento)' : '(Producto de Merchandising)'}</h3>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <div className="quantity-controls">
                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              </div>
              <button onClick={() => handleRemoveClick(item.id)}>
                <FaTrashAlt /> Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <h3>Total: ${total.toFixed(2)}</h3> {/* Mostrar el total exacto con dos decimales */}
        <div className="cart-actions">
          <Button variant="danger" onClick={clearCart}>Limpiar Carrito</Button>
          <Button variant="success" onClick={finalizePurchase}>Finalizar Compra</Button>
        </div>
      </div>

      {/* Modal de confirmación para eliminar un ítem */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar este ítem?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmRemove}>Eliminar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de compra exitosa */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Compra Exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tu compra ha sido completada con éxito. ¡Gracias por tu compra!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
