import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import logo from "../assets/logo-.jpg";
import { apiRequest } from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: { dni, email, password },
      });


      /* 🔐 guardar token */
      localStorage.setItem("token", data.token);

      /* 🚀 ir al dashboard */
      navigate("/");

    } catch (err) {
       if (err.message === "PASSWORD_EXPIRED") {
        navigate("/change-password");
        return;
      }
     setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-80"
      >
 <div className="flex flex-col items-center mb-6">
  <img src={logo} className="h-16 mb-2" />
  <span className="font-semibold text-gray-600 text-sm">
  </span>
</div>


        <h2 className="text-xl font-bold mb-6 text-center">
          Iniciar sesión
        </h2>

        <input
          type="text"
          placeholder="DNI"
          className="w-full mb-3 p-2 border rounded"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>

    </div>
  );
}
