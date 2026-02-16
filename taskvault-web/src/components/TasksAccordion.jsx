import React, { useState } from "react";
import PropTypes from "prop-types";
import { deleteTask, updateTask } from '../api/task'

const TasksAccordion = ({ data, onUpdated }) => {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState(data);
    const [changed, setChanged] = useState(false);

    const toggleOpen = () => setOpen(!open);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    const date = today.getDate() + " " + months[today.getMonth()] + " " + today.getFullYear();

    const handleChange = (field, value) => {
        setTask(prev => ({ ...prev, [field]: value }));
        setChanged(true);
    };


    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };


    const handleUpdate = async () => {
        try {

            const updateTaskData = {
                ...task,
                updateAt: new Date()
            }

            const response = await updateTask(updateTaskData.id, updateTaskData);
            if (onUpdated) {
                onUpdated();
                setChanged(false);
            }

        } catch (err) {
            console.error("Error en actualizado:", err);
        }

    };

    const handleDelete = async () => {
        try {
            const response = await deleteTask(task.id);
            if (onUpdated) {
                onUpdated();
            }

        } catch (err) {
            console.error("Error en eliminado:", err);
        }

    };

    return (
        <div className=

            {` rounded-xl p-4 mb-4 transition-all duration-300 border-2 border-solid  shadow-xl 
 ${task.status === "PENDING" ? "border-cyan-500 " : "border-red-600"} `}
        >
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleOpen}>
                <div>
                    <h1 className="text-xl font-semibold ">{task.title || "Sin título"}</h1>
                    <p className="text-sm opacity-70">
                        {task.createAt ? formatDate(task.createAt) : formatDate(new Date())}
                    </p>
                </div>

                <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="black"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <div
                className={`transition-all duration-300 overflow-hidden ${open ? "max-h-[500px] mt-4" : "max-h-0"
                    }`}
            >
                <textarea
                    placeholder="Descripción"
                    value={task.description}
                    className='w-full resize-none overflow-hidden p-2 rounded-2xl text-[21px] focus:outline-none'
                    rows={2}
                    onChange={(e) => handleChange("description", e.target.value)}
                    onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                />
                <div className="border-b-1"></div>
                {task.updateAt && (
                    <div className='w-full flex justify-end text-[15px] opacity-60'>
                        <p>Fecha modificación: {task.updateAt}</p>
                    </div>
                )}


                <p className="mb-1 font-semibold  text-[21px] mt-5">Estado</p>

                <div className="flex w-full rounded-lg overflow-hidden border text-[17px]">
                    <button
                        type="button"
                        onClick={() => handleChange("status", "PENDING")}
                        className={`w-1/2 py-2 text-center transition
                                 ${task.status === "PENDING"
                                ? "bg-cyan-500 text-white"
                                : "bg-gray-100 hover:bg-gray-200"}
                                `}
                    >
                        Pendiente
                    </button>

                    <button
                        type="button"
                        onClick={() => handleChange("status", "COMPLETED")}
                        className={`w-1/2 py-2 text-center transition
                                ${task.status === "COMPLETED"
                                ? "bg-red-500 text-white"
                                : "bg-gray-100 hover:bg-gray-200"}
                                `}
                    >
                        Completado
                    </button>
                </div>




                <div className="flex justify-end mt-4 space-x-3">
                    <button className='bg-red-600 hover:bg-red-700 text-white rounded-xl  cursor-pointer p-3 transition duration-300 ease-in-out
               hover:scale-105'
                        onClick={handleDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            stroke="currentColor"
                            width="24"
                            height="24">
                            <path stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z" />
                        </svg>
                    </button>

                    {changed && (
                        <button
                            className='bg-blue-600 rounded-xl p-3 cursor-pointer text-white   transition duration-300 ease-in-out
               hover:scale-105 hover:bg-blue-700'
                            onClick={handleUpdate}
                        >
                            Guardar
                        </button>
                    )}

                </div>

            </div>
        </div>
    );
};

TasksAccordion.propTypes = {
    data: PropTypes.object,
    onUpdated: PropTypes.func
};

export default TasksAccordion;
