// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './DashboardStyle.css';

const apiUrl = 'http://localhost:4000/api/usuarios'; // Cambia esto según sea tu API

const UserDash = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    edad: '',
    rol: '',
  });
  const [editingUser, setEditingUser] = useState(null);

  // Lista de roles disponibles
  const rolesDisponibles = ['admin', 'user'];

  // Obtener usuarios
  const fetchUsers = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Crear un usuario
  const handleCreateUser = async (e) => {
    e.preventDefault();
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      setNewUser({ nombre: '', email: '', edad: '', rol: '' });
      fetchUsers();
    }
  };

  // Eliminar un usuario
  const handleDeleteUser = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchUsers();
    }
  };

  // Iniciar la edición de un usuario
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({
      nombre: user.nombre,
      email: user.email,
      edad: user.edad,
      rol: user.rol,
    });
  };

  // Actualizar un usuario
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/${editingUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      setEditingUser(null);
      setNewUser({ nombre: '', email: '', edad: '', rol: '' });
      fetchUsers();
    }
  };

  return (
    <div className="container-dashboard">
      <h1 className='username'>Usuarios</h1>

      
      <form onSubmit={editingUser ? handleUpdateUser : handleCreateUser}>
      <h2>{editingUser ? 'Editar Usuario' : 'Crear Usuario'}</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.nombre}
          onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Edad"
          value={newUser.edad}
          onChange={(e) => setNewUser({ ...newUser, edad: e.target.value })}
          required
        />

        {/* Selector de roles */}
        <label htmlFor="rol" className='labelRole'>Rol:</label>
        <select
          id="rol"
          className='selectRol'
          value={newUser.rol}
          onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
          required
        >
          <option value="" >Seleccionar Rol</option>
          {rolesDisponibles.map((rol) => (
            <option key={rol} value={rol}>
              {rol}
            </option>
          ))}
        </select>

        <button type="submit">{editingUser ? 'Actualizar' : 'Crear'} Usuario</button>
      </form>

      <h2 className='username'>Lista de Usuarios</h2>
      <table className="table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {/* <td>{user._id}</td> */}
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.roles}</td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEditUser(user)}
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

export default UserDash;
