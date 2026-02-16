import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br  px-6 text-center text-black">
      
      <h1 className="mb-4 text-5xl font-extrabold tracking-tight ">
         Bienvenido a <span className="text-green-400">TaskVault</span>
      </h1>

      <p className="mb-10 max-w-xl text-lg ">
        Una herramienta moderna de gestión de tareas con autenticación JWT
        y persistencia en PostgreSQL.
      </p>

      <div className="flex gap-4">
        <button
          className="inline-flex items-center justify-center rounded-xl border border-zinc-600 bg-zinc-950 px-6 py-3 font-medium text-slate-200 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-zinc-900"
          onClick={() => navigate("/login")}
        >
          Iniciar sesión
        </button>

        <button
          className="inline-flex items-center justify-center rounded-xl border border-greeb-500 bg-green-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-green-500"
          onClick={() => navigate("/register")}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default HomePage;
