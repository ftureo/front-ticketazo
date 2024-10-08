import React, { useState, useEffect, useContext } from 'react';
import "../../Pages/HomeCards/HomeCards.css";
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';  // Importamos SweetAlert2
import { ShoppingCardContext } from '../../contexts/ShoppingCardContext'; // Importar el contexto

const apiEventUrl = 'http://localhost:4000/api/eventos'; // URL de la API de eventos

const EventCard = ({ date, title, description, imageUrl }) => {
  const { addItemToCart } = useContext(ShoppingCardContext);  // Usar el contexto para agregar al carrito
  const price = 35000;  // Precio fijo para los eventos

  const handleAddToCart = () => {
    // Agregar el evento con el precio fijo al carrito
    addItemToCart({ id: Math.random(), title, price, type: 'event' });

    // Mostrar SweetAlert2 para indicar éxito
    Swal.fire({
      title: 'Evento agregado',
      text: 'El evento ha sido agregado al carrito con éxito!',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  };

  return (
    <div className="event-card">
      <img src={imageUrl} alt={title} className="img-fluid event-image" />
      <div className="event-content">
        <h2>{date}</h2>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Precio: ${price}</p> {/* Mostrar el precio correctamente */}
        <button className="event-button" onClick={handleAddToCart}>
          COMPRAR
        </button>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

const EventsSection = () => {
  const [events, setEvents] = useState([]);

  // Obtener los eventos de la API
  const fetchEvents = async () => {
    try {
      const response = await fetch(apiEventUrl);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
    }
  };

  useEffect(() => {
    fetchEvents(); // Llamar a la función para traer los eventos al cargar el componente
  }, []);

  return (
    <section className="events-section">
      <h2>EVENTOS</h2>
      <div className="events-grid">
        {events.map(event => (
          <EventCard
            key={event._id}
            date={new Date(event.date).toLocaleDateString()}
            title={event.title}
            description={event.description}
            imageUrl={event.image}
          />
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
