import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { register } from '../api/auth'
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [alerta, setAlerta] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
  if (password && passConfirm && password !== passConfirm) {
    setAlerta("Las contraseñas no coinciden");
  } else {
    setAlerta("");
  }
}, [password, passConfirm]);


    const handleClick = async () => {

        if ( username && password && passConfirm) {
            try {
                const result = await register(username, password);
                console.log("Usuario registrado con éxito", result);

                if (result) {
                    navigate("/home");
                }
            } catch (err) {
                console.error("Error en el registro:", err);
                alert("Error al registrarse");
            }
        }
        else {
            alert("Todos los campos deben estar llenos");
        }

    };

    return (
        <div className="border-1 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4">
            <h1 className="text-xl font-semibold">Registro</h1>

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

                <p className="flex flex-col text-center">
                    Confirmar Contraseña:
                    <input className="border-b border-gray-500 focus:outline-none text-center"
                        type="password"
                        value={passConfirm}
                        onChange={(e) => setPassConfirm(e.target.value)} />
                </p>

               <p className="text-red-500 text-center">{alerta}</p>
               

            </div>

            <button onClick={handleClick} className="bg-green-400 rounded-3xl p-2 px-6 font-medium hover:bg-green-500">
                Registrarse
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


export default RegisterForm;