import React, { useState, useEffect, useRef } from "react";

interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function LoginModal({ isOpen, closeModal }: LoginModalProps) {
  const usernameRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isOpen && usernameRef.current) {
      usernameRef.current.focus();
    }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número."
      );
      return;
    } else {
      setPasswordError(""); // Resetea el error si la contraseña es válida
    }

    if (!username || !password) {
      alert("Por favor, llena todos los campos.");
      return;
    }

    // Aquí va la lógica de autenticación
    alert("Inicio de sesión exitoso");
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
      role="dialog"
      aria-labelledby="login-modal-title"
      aria-hidden={!isOpen}
    >
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
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-black">
              Usuario:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border rounded"
              required
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-600 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-full"
          >
            Iniciar sesión
          </button>
        </form>
        <button
          className="mt-4 w-full text-center text-pink-600"
          onClick={closeModal}
        >
          Cerrar
        </button>
        <button
          className="w-full text-center text-pink-600 mt-2"
          onClick={() => alert("Redirigiendo a recuperar contraseña...")}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  );
}
