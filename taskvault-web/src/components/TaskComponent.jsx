import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { saveTask } from '../api/task'

const TaskComponent = ({ data, onUpdated }) => {

    // Copiamos los datos en un estado interno editable
    const [task, setTask] = useState(data);
    const [changed, setChanged] = useState(false);

    // Si el componente recibe una nueva task, la sincronizamos
    useEffect(() => {
        setTask(data);
    }, [data]);

    const handleChange = (field, value) => {
        setTask(prev => ({ ...prev, [field]: value }));
        setChanged(true);
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    const date = today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();


    const clearForm = () => {
         setTask({
                            title: "",
                            description: "",
                            status: "PENDING",
                            createAt: "",
                            updateAt: ""
                        })
    }
    const handleCreate = async () => {
        try {
            const response = await saveTask(task);
            clearForm();
            if (onUpdated) {
                onUpdated();
            }

        } catch (err) {
            console.error("Error en guardado:", err);
        }

    };

    return (
        <div className='bg-[#d4cbcb] rounded-xl p-2 mb-3 shadow-xl/20'>
            <input
                type="text"
                placeholder="Titulo"
                className='w-full bg-[#d4cbcb] placeholder-neutral-500mb-2 border-b-1 focus:outline-none'
                value={task.title}
                onChange={(e) => handleChange("title", e.target.value)}
            />
           

            <div className='w-full flex flex-row place-content-between text-[15px] opacity-80'>
                <p>{date}</p>
            </div>

            <textarea
                placeholder="Descripción"
                value={task.description}
                className='w-full resize-none overflow-hidden p-2 rounded  text-[21px] bg-[#d4cbcb] placeholder-neutral-500 focus:outline-none'
                rows={2}
                onChange={(e) => handleChange("description", e.target.value)}
                onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
            />

           
            <div className='flex justify-end h-16 space-x-1 m-3'>

                <button onClick={clearForm} className='bg-sky-600 hover:bg-sky-700 text-white rounded-xl  p-3 transition duration-300 ease-in-out
               hover:scale-105'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6">
                        <path d="M3 22l2-5 5-5 4 4-5 5-5 1z" />
                        <path d="M14 9l7-7" />
                    </svg>

                </button>


                <button className='flex bg-green-800   text-white  rounded-xl items-center space-x-12 p-3 transition duration-300 ease-in-out
               hover:scale-105 hover:bg-green-900' onClick={handleCreate}>
                    Crear
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width="24"
                        height="24">
                        <path stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4" />
                    </svg>
                </button>

            </div>
        </div>
    );
};

TaskComponent.propTypes = {
    data: PropTypes.object,
    onUpdated: PropTypes.func
};

export default TaskComponent;
