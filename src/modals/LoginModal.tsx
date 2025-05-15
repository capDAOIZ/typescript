import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function LoginModal({ isOpen, closeModal }: LoginModalProps) {
  const gmailRef = useRef<HTMLInputElement>(null);

  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // Hace focus en el input de gmail y tambien hace una suscripcion a la tecla escape
  useEffect(() => {
    if (isOpen && gmailRef.current) {
      gmailRef.current.focus();
    }
    setPasswordError("");
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen]);

  // Enviar los datos para hacer el login
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!gmail || !password) {
      alert("Por favor, llena todos los campos.");
      return;
    }
    try {
      await login(gmail, password);
      alert("Inicio de sesión exitoso");
      navigate("/");
      closeModal();
    } catch (e: any) {
      let errores = "";
      console.log(e);
      if (e.message === "Network Error") {
        setError(true);
        return;
      }
      const errorObj = e.response.data.errors;
      if (errorObj) {
        Object.keys(errorObj).forEach((key) => {
          errorObj[key].forEach((msg: string) => {
            errores += `${msg}\n`;
          });
        });
      }

      setPasswordError(errores || "Usuario no encontrado");
    }
  }

  // Redireccion para registrarse
  function handleRegisterClick() {
    closeModal();
    navigate("/registrarse");
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
      role="dialog"
      aria-labelledby="login-modal-title"
      aria-hidden={!isOpen}
    >
      {/* stopPropagation() para evitar propagaciones de eventos de hijo a padre */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full sm:max-w-sm md:max-w-md lg:max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="login-modal-title"
          className="text-center text-2xl font-semibold mb-4 text-black"
        >
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Inputs del form */}
          <div className="mb-4">
            <label htmlFor="gmail" className="block mb-2 text-black">
              Gmail:
            </label>
            <input
              type="text"
              id="gmail"
              name="gmail"
              className="w-full p-2 border rounded"
              required
              ref={gmailRef}
              value={gmail}
              placeholder="Por ejemplo: pepe@gmail.com"
              onChange={(e) => setGmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-black">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded"
              required
              autoComplete="current-password"
              value={password}
              placeholder="Recuerda que tiene que ser una contraseña segura"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error ? (
              <p className="text-red-600 text-sm mt-3 text-center">
                Problemas en la red, intentalo mas tarde
              </p>
            ) : (
              <p className="text-red-600 text-sm mt-3  text-center">
                {passwordError}
              </p>
            )}
          </div>
          {/* Boton de iniciar sesion */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-full"
          >
            Iniciar sesión
          </button>
        </form>
        {/* Boton de registrarse */}
        <button
          className="mt-4 w-full text-center text-pink-600"
          onClick={handleRegisterClick}
        >
          ¿No tienes cuenta? Registrate{" "}
        </button>
        {/* Recuperar contreseña. EN PROCESO */}
        <button
          className="w-full text-center text-pink-600 mt-2"
          onClick={() => alert("Redirigiendo a recuperar contraseña...")}
        >
          ¿Olvidaste tu contraseña?
        </button>
        {/* Cerrar modal*/}
        <button
          className="mt-2 w-full text-center text-pink-600"
          onClick={closeModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
