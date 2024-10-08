import React, { useState } from 'react'; 
import { FaTrashAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Concierto A', price: 15.000 },
    { id: 2, name: 'Concierto B', price: 25.000 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleRemoveClick = (itemId) => {
    setShowModal(true);
    setItemToRemove(itemId);
  };

  const confirmRemove = () => {
    setCartItems(cartItems.filter(item => item.id !== itemToRemove));
    setShowModal(false);
    setItemToRemove(null);
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const finalizePurchase = () => {
    console.log("Compra finalizada!");
    setShowEmailModal(true);
  };

  const sendInvoiceEmail = () => {
    console.log("Enviando factura con QR por email...");
    setShowEmailModal(false);
  };

  return (
    <div className="shopping-cart">
      <h2>Carrito de Compras</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name} - ${item.price}</span>
              <FaTrashAlt className="trash-icon" onClick={() => handleRemoveClick(item.id)} />
            </div>
          ))
        )}
      </div>
      <div className="cart-total">
        <h3>Total: ${total}</h3>
      </div>

      <div className="cart-actions">
        <button className="empty-cart-button" onClick={emptyCart}>Vaciar Carrito</button>
        <button className="finalize-button" onClick={finalizePurchase}>Finalizar Compra</button>
      </div>

     
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que deseas eliminar este ítem?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmRemove}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

     
      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enviar Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>Factura generada. ¿Deseas enviar la factura con un código QR por email?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={sendInvoiceEmail}>
            Enviar Factura
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
