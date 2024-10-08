import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../UserProfile/Profile.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Profile() {
  const navigate = useNavigate(); // Inicializa useNavigate
  const defaultAvatar = 'https://via.placeholder.com/150'; 

  // Cargar los datos del usuario desde localStorage o establecer los valores por defecto
  const initialUser = JSON.parse(localStorage.getItem('user')) || {
    userName: 'Juan Perez',
    email: 'jperez@gmail.com',
    phone: '',
    address: {
      street: 'Calle Falsa',
      number: 123,
      city: 'Tucumán',
      state: 'Tucumán',
      zipCode: '4000',
    },
    profilePicture: defaultAvatar,
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false); 
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); // Estado para el modal

  // Guardar los datos en localStorage cada vez que se actualiza el usuario
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const validateFields = () => {
    let errors = {};
    if (!user.userName) errors.userName = 'El nombre de usuario es requerido';
    if (!user.email) {
      errors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'El formato del correo es inválido';
    }
    // El campo de teléfono no es requerido, pero si se ingresa debe tener el formato correcto
    if (user.phone && !/^\+?\d{1,15}$/.test(user.phone)) {
      errors.phone = 'El formato del teléfono es inválido';
    }
    if (!user.address.street || !user.address.number || !user.address.city || !user.address.state || !user.address.zipCode) {
      errors.address = 'Todos los campos de la dirección son obligatorios';
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('address')) {
      // Manejando los campos anidados de dirección
      const [_, field] = name.split('.');
      setUser({
        ...user,
        address: {
          ...user.address,
          [field]: value,
        }
      });
    } else {
      setUser({
        ...user,
        [name]: value
      });
    }
  };

  const handleAvatarUrlChange = () => {
    if (newAvatarUrl) {
      setUser({ ...user, profilePicture: newAvatarUrl });
      setNewAvatarUrl(''); 
    }
  };

  const handleDeleteAvatar = () => {
    setUser({ ...user, profilePicture: defaultAvatar });
  };

  const toggleEdit = () => {
    if (isEditing) {
      const validationErrors = validateFields();
      if (Object.keys(validationErrors).length === 0) {
        // Guardar cambios
        setIsEditing(false);
        setErrors({});
      } else {
        setErrors(validationErrors);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleLogout = () => {
    setShowModal(true); // Mostrar el modal
  };

 
  const confirmLogout = () => {
    setShowModal(false); 
    localStorage.removeItem('user'); 
    localStorage.removeItem('token');
    navigate('/login'); // Utiliza navigate en lugar de window.location.href
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.profilePicture} alt="Foto de perfil" className="profile-avatar" />
        <h1>{user.userName}</h1>
        <p>{user.email}</p>
      </div>

      {isEditing ? (
        <div className="profile-edit-form">
          <h2>Editar Perfil</h2>
          <div>
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleInputChange}
              placeholder="Nombre de Usuario"
            />
            {errors.userName && <span className="error">{errors.userName}</span>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              placeholder="Teléfono (opcional)"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <h3>Dirección</h3>
          <div>
            <input
              type="text"
              name="address.street"
              value={user.address.street}
              onChange={handleInputChange}
              placeholder="Calle"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div>
            <input
              type="number"
              name="address.number"
              value={user.address.number}
              onChange={handleInputChange}
              placeholder="Número"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div>
            <input
              type="text"
              name="address.city"
              value={user.address.city}
              onChange={handleInputChange}
              placeholder="Ciudad"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div>
            <input
              type="text"
              name="address.state"
              value={user.address.state}
              onChange={handleInputChange}
              placeholder="Provincia"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <div>
            <input
              type="text"
              name="address.zipCode"
              value={user.address.zipCode}
              onChange={handleInputChange}
              placeholder="Código Postal"
            />
            {errors.address && <span className="error">{errors.address}</span>}
          </div>
          <label>
            Cambiar foto de perfil (URL):
            <input
              type="text"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              placeholder="Ingresa la URL de la imagen"
            />
          </label>
          <button onClick={handleAvatarUrlChange}>Aplicar Nueva Foto</button>
          <button onClick={handleDeleteAvatar}>Eliminar Foto Actual</button>
          <button onClick={toggleEdit}>Guardar Cambios</button>
        </div>
      ) : (
        <div className="profile-details">
          <h2>Detalles del Usuario</h2>
          <ul>
            <li><strong>Nombre de Usuario:</strong> {user.userName}</li>
            <li><strong>Correo:</strong> {user.email}</li>
            <li><strong>Teléfono:</strong> {user.phone ? user.phone : 'No especificado'}</li>
            <li><strong>Dirección:</strong> {user.address.street} {user.address.number}, {user.address.city}, {user.address.state}, {user.address.zipCode}</li>
          </ul>

          <div className="button-container">
            <button onClick={toggleEdit} className="edit-button">Editar Perfil</button>
            <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cierre de Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro que deseas cerrar sesión?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={confirmLogout}>Cerrar Sesión</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
