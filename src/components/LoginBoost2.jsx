import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';

function LoginBoost2() {
  const [showLogin, setShowLogin] = useState(true);
  const { user, admin, login, logout } = useAuthContext();
  const navigate = useNavigate();

  const toggleForm = () => setShowLogin(!showLogin);

  // Cierre de sesión
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/login'); // O donde quieras redirigir al desloguear
  };

  if (user || admin) {
    return (
      <form onSubmit={handleLogout} className="d-flex justify-content-center align-items-center min-vh-100">
        <button type="submit" className="btn btn-danger btn-lg">
          Cerrar sesión
        </button>
      </form>
    );
  }

  return showLogin ? (
    <LoginForm toggleForm={toggleForm} login={login} />
  ) : (
    <RegisterForm toggleForm={toggleForm} login={login} />
  );
}

function LoginForm({ toggleForm, login }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const iniciarSesionEmailPass = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginEmailPass(usuario, password);
      login(usuario);
      dispararSweetBasico('Logeo exitoso', '', 'success', 'Confirmar');
      navigate('/'); // Redirigir tras login
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        dispararSweetBasico('Credenciales incorrectas', '', 'error', 'Cerrar');
      } else {
        dispararSweetBasico('Error inesperado', error.message, 'error', 'Cerrar');
      }
    }
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={iniciarSesionEmailPass}
        className="p-4 border rounded shadow"
        aria-label="Formulario de inicio de sesión"
      >
        <h3>Iniciar sesión con Email y contraseña</h3>
        <div className="mb-3">
          <label htmlFor="login-email" className="form-label">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            disabled={loading}
            aria-required="true"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="login-password" className="form-label">
            Contraseña
          </label>
          <input
            id="login-password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            aria-required="true"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
        <button
          type="button"
          className="btn btn-link mt-3"
          onClick={toggleForm}
          disabled={loading}
          aria-label="Ir al formulario de registro"
        >
          ¿No tienes cuenta? Regístrate
        </button>
      </form>
    </div>
  );
}

function RegisterForm({ toggleForm, login }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registrarUsuario = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await crearUsuario(usuario, password);
      login(usuario);
      dispararSweetBasico('Registro exitoso', '', 'success', 'Confirmar');
      navigate('/'); // Redirigir tras registro
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        dispararSweetBasico('Credenciales incorrectas', '', 'error', 'Cerrar');
      } else if (error.code === 'auth/weak-password') {
        dispararSweetBasico(
          'Contraseña débil',
          'La contraseña debe tener al menos 6 caracteres',
          'error',
          'Cerrar'
        );
      } else {
        dispararSweetBasico('Error inesperado', error.message, 'error', 'Cerrar');
      }
    }
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={registrarUsuario}
        className="p-4 border rounded shadow"
        aria-label="Formulario de registro"
      >
        <h3>Registrarse</h3>
        <div className="mb-3">
          <label htmlFor="register-email" className="form-label">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            className="form-control"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            disabled={loading}
            aria-required="true"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="register-password" className="form-label">
            Contraseña
          </label>
          <input
            id="register-password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            aria-required="true"
            minLength={6}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
        <button
          type="button"
          className="btn btn-link mt-3"
          onClick={toggleForm}
          disabled={loading}
          aria-label="Ir al formulario de inicio de sesión"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </form>
    </div>
  );
}

export default LoginBoost2;
