// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './DashboardStyle.css';
const apiEventUrl = 'http://localhost:4000/api/eventos'; // API de eventos
const apiUrlCategories = 'http://localhost:4000/api/categorias'; // API de categorías

const Event = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]); // Variable para almacenar las categorías
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: '',
    tickets: 0,
    categoria: '', // Añadimos la categoría al estado del nuevo evento
  });
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: '',
  }); // Estado para la nueva categoría

  const [editingEvent, setEditingEvent] = useState(null);

  // Obtener eventos
  const fetchEvents = async () => {
    const response = await fetch(apiEventUrl);
    const data = await response.json();
    setEvents(data);
  };

  // Obtener categorías
  const fetchCategories = async () => {
    const response = await fetch(apiUrlCategories);
    const data = await response.json();
    setCategories(data); // Aquí guardamos las categorías
  };

  useEffect(() => {
    fetchEvents();
    fetchCategories(); // Obtener categorías al cargar el componente
  }, []);

  // Crear un evento
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const response = await fetch(apiEventUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    if (response.ok) {
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        image: '',
        tickets: 0,
        categoria: '', // Reiniciar la categoría seleccionada
      });
      fetchEvents();
    }
  };

  // Crear una categoría
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const response = await fetch(apiUrlCategories, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    });
    if (response.ok) {
      setNewCategory({
        name: '',
        description: '',
        image: '',
      });
      fetchCategories(); // Actualizar la lista de categorías después de crear una nueva
    }
  };

  // Eliminar un evento
  const handleDeleteEvent = async (id) => {
    const response = await fetch(`${apiEventUrl}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchEvents();
    }
  };

  // Iniciar la edición de un evento
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().slice(0, 10),
      location: event.location,
      image: event.image,
      tickets: event.tickets,
      categoria: event.categoria ? event.categoria._id : '', // Verifica si la categoría existe
    });
  };

  // Actualizar un evento
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiEventUrl}/${editingEvent._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    if (response.ok) {
      setEditingEvent(null);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        location: '',
        image: '',
        tickets: 0,
        categoria: '', // Reiniciar la categoría seleccionada
      });
      fetchEvents();
    }
  };

  return (
    <div className="container">
      <h1>Eventos</h1>

      <h2>{editingEvent ? 'Editar Evento' : 'Crear Evento'}</h2>
      <form onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}>
        <input
          type="text"
          placeholder="Título"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          required
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="URL de imagen"
          value={newEvent.image}
          onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
        />
        <textarea
          placeholder="Descripción"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Boletos"
          value={newEvent.tickets}
          onChange={(e) => setNewEvent({ ...newEvent, tickets: Number(e.target.value) })}
          required
        />

        {/* Selector de categorías */}
        <label htmlFor="categoria">Categoría</label>
        <select
          id="categoria"
          className='selectCategoria'
          value={newEvent.categoria}
          onChange={(e) => setNewEvent({ ...newEvent, categoria: e.target.value })}
          required
        >
          <option value="">Seleccionar Categoría</option>
          {categories.map((categoria) => (
            <option key={categoria._id} value={categoria._id}>
              {categoria.name} {/* Mostrar el nombre de la categoría */}
            </option>
          ))}
        </select>

        <button type="submit">{editingEvent ? 'Actualizar' : 'Crear'} Evento</button>
      </form>

      <h2>Crear Categoría</h2>
      <form onSubmit={handleCreateCategory}>
        <input
          type="text"
          placeholder="Nombre de la Categoría"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción de la Categoría"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL de la Imagen"
          value={newCategory.image}
          onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
        />
        <button type="submit">Crear Categoría</button>
      </form>

      <h2>Lista de Eventos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha</th>
            <th>Ubicación</th>
            <th>Descripción</th>
            <th>Boletos</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.description}</td>
              <td>{event.tickets}</td>
              <td>{event.categoria ? event.categoria.name : 'Sin categoría'}</td>
              <td>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEditEvent(event)}
                  className="btn btn-primary ms-2"
                >
                  Modificar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Event;
