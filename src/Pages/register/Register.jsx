import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate(); // Crear una instancia de navigate

  const handleNavigate = () => {
    navigate('/login')
  }
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    phone: "",
    address: {
      street: "",
      number: "",
      city: "",
      state: "",
      zipCode: "",
    },
    profilePicture: "",
  });

  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasUppercase: false,
    hasSymbol: false,
  });

  const [showValidations, setShowValidations] = useState(false); // Estado para controlar la visibilidad de las validaciones

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validatePassword = (password) => {
    setShowValidations(true); // Mostrar validaciones cuando se ingresa la contraseña
    setPasswordValidations({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasSymbol: /[!@#$%^&*]/.test(password),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, password, email, phone, address, profilePicture } = formData;

    if (
      !passwordValidations.minLength ||
      !passwordValidations.hasUppercase ||
      !passwordValidations.hasSymbol
    ) {
      Swal({
        title: "Error",
        text: "La contraseña no cumple con los requisitos",
        icon: "error",
        confirmButtonText: "Entendido",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/usuarios/register", {
        userName,
        password,
        email,
        phone,
        address,
        profilePicture,
      });
      console.log(response.data);

      // Mostrar SweetAlert de registro exitoso
      Swal({
        title: "Registro Exitoso",
        text: "¡Te has registrado exitosamente!",
        icon: "success",
        buttons: {
          confirm: {
            text: "Continuar",
            value: true,
            visible: true,
            className: "swal-button",
            closeModal: true,
          },
        },
      }).then((willRedirect) => {
        if (willRedirect) {
          navigate("/"); // Redirigir a la página de inicio
        }
      });
    } catch (error) {
      console.error("Error:", error);
      Swal({
        title: "Error",
        text: error.response ? error.response.data.message : "Error desconocido",
        icon: "error",
        buttons: {
          confirm: {
            text: "Entendido",
            value: true,
            visible: true,
            className: "swal-button",
            closeModal: true,
          },
        },
      });
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <input
          type="text"
          name="userName"
          placeholder="Nombre de usuario"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="profilePicture"
          placeholder="URL de la foto"
          onChange={handleChange}
        />

        <h4>Dirección:</h4>
        <input
          type="text"
          name="address.street"
          placeholder="Calle"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="address.number"
          placeholder="Número"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.city"
          placeholder="Ciudad"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.state"
          placeholder="Estado"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address.zipCode"
          placeholder="Código postal"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={(e) => {
            handleChange(e);
            validatePassword(e.target.value);
          }}
          required
        />

        {showValidations && ( // Mostrar validaciones solo si showValidations es verdadero
          <div className="password-validations">
            <ul>
              <li
                className={passwordValidations.minLength ? "valid" : "invalid"}
              >
                Mínimo 8 caracteres
              </li>
              <li
                className={
                  passwordValidations.hasUppercase ? "valid" : "invalid"
                }
              >
                Al menos una mayúscula
              </li>
              <li
                className={passwordValidations.hasSymbol ? "valid" : "invalid"}
              >
                Al menos un símbolo (!, @, #, $, %, ^, &, *)
              </li>
            </ul>
          </div>
        )}

        <button type="submit">Registrar</button>
        <button onClick={handleNavigate} type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Register;
