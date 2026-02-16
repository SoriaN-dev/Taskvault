import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { login } from '../api/auth'
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleClick = async () => {

        if (username && password ) {
            try {

                const result = await login(username, password);
                console.log("Resultado del login:", result);

                if (result) {
                    navigate("/task");
                }
            } catch (err) {
                console.error("Error en el login:", err);
                alert("Error al iniciar sesión");
            }

        }
        else {
            alert("Todos los campos deben estar llenos");
        }


    };

    return (
        <div className="border-1 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4">
            <h1 className="text-xl font-semibold">Iniciar Sesión</h1>

            <div className="flex flex-col space-y-3 w-full max-w-xs">
                <p className="flex flex-col text-center">
                    Nombre de Usuario:
                    <input className="border-b border-gray-500 focus:outline-none text-center"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </p>

                <p className="flex flex-col text-center">
                    Contraseña:
                    <input className="border-b border-gray-500 focus:outline-none text-center"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </p>
            </div>

            <button onClick={handleClick} className="bg-green-400 rounded-3xl p-2 px-6 font-medium hover:bg-green-500">
                Iniciar Sesión
            </button>

            <button onClick={() => {
                navigate("/");
            }

            }
                className="border-b-2 rounded-3xl p-2 px-6 font-medium hover:bg-green-500">
                Volver
            </button>


        </div>
    );
};


export default LoginForm;