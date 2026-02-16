import React, { useState, useEffect, use } from 'react';
import { getUserTasks, getTasksByStatus } from '../api/task';
import Task from "../components/TaskComponent";
import TasksAccordion from '../components/TasksAccordion'
import { logout } from '../api/auth'
import { useNavigate } from "react-router-dom";

function TasksPage() {

    const [statusOpen, setStatusOpen] = useState(false);
    const [active, setActive] = useState("");
    const [isCreating, setIsCreating] = useState(true);
    const [isViewingTasks, setIsViewingTasks] = useState(true);
    const [menuOpen, setMenuOpen] = useState(true);
    const [tasks, setTasks] = useState([]);

    const [statusFilter, setStatusFilter] = useState("ALL");
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "PENDING",
        createAt: "",
        updateAt: ""
    });
    const navigate = useNavigate();


    const fetchTasks = async (status = "ALL") => {
        let data;

        if (!status || status === "ALL") {
            data = await getUserTasks();
        } else {
            data = await getTasksByStatus(status);
        }

        setTasks(data);
        setTasks(prev => [...prev].reverse());
    };


    const closeMenuOnMobile = () => {
        if (window.innerWidth < 768) {
            setMenuOpen(false);
        }
    };


    const titleMap = {
        ALL: "Mis Tareas",
        COMPLETED: "Tareas Completadas",
        PENDING: "Tareas Pendientes"
    };

    const handleLogout = async () => {
        const response = await logout();
        navigate("/");
    }


    useEffect(() => {
        fetchTasks(statusFilter);
    }, [statusFilter]);

    return (
        <div className="min-h-screen flex flex-col text-2xl ">
            <header className="bg-[#ffffff] h-[60px] flex p-2 items-center place-content-between sticky top-0 z-50 border-b-1">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 rounded hover:bg-gray-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-9"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
                <div className='flex space-x-2'>

                    <button type="button"
                        onClick={handleLogout}
                        className="text-danger rounded-2xl bg-neutral-primary border border-danger hover:bg-green-700 focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                        Cerrar Sessión
                    </button>
                </div>


            </header>

            <div className='flex flex-row min-h-screen'>

                <div
                    className={`
                    fixed  left-0 z-40
                    h-screen
                    w-4/5 md:w-[25%]
                    bg-white
                    border-r
                    overflow-y-auto
                    flex flex-col
                    pt-10
                    transform transition-transform duration-300
                    ${menuOpen ? "translate-x-0" : "-translate-x-full"}
                `}
                >
                    <button onClick={() => {
                        setIsViewingTasks(false);
                        setIsCreating(true);
                        setActive("crear");
                        closeMenuOnMobile();

                    }}
                        className={`bg-[#7ec287] hover:bg-green-700 active:bg-green-600 px-4 py-2 rounded-xl flex items-center justify-center mb-8 pt-7 pb-7 ml-8 mr-8 
                    ${active === "crear" ? "bg-green-600 " : ""}`}>
                        Crear</button>

                    <button onClick={() => {
                        setIsViewingTasks(true);
                        setIsCreating(false);
                        setActive("todas");
                        setStatusFilter("ALL");
                        closeMenuOnMobile();
                    }}
                        className={` hover:bg-green-700 px-4 py-2 rounded-xl flex items-center justify-center mb-4 ${active === "todas" ? "bg-green-600 " : ""}`}>Todas mis tareas</button>
                    <div className='border-1'></div>
                    <div className='w-full mb-4'>
                        <button className='hover:bg-green-700 active:bg-green-600 px-4 py-2 rounded-xl flex items-center justify-center w-full'
                            onClick={() => setStatusOpen(!statusOpen)}>
                            Estado
                            <svg className={`w-4 h-4 ml-2 transition-transform ${statusOpen ? "rotate-180 " : ""}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {statusOpen && (
                            <div className="flex flex-col items-center justify-center w-full">
                                <button onClick={() => {
                                    setActive("incompleto");
                                    setIsViewingTasks(true);
                                    setIsCreating(false);
                                    setStatusFilter("PENDING");
                                    closeMenuOnMobile();

                                }}
                                    className={` hover:bg-green-700 px-4 py-2 rounded-xl w-full flex items-center justify-center ${active === "incompleto" ? "bg-green-600 " : ""}`}>
                                    Incompletas
                                </button>

                                <button onClick={() => {
                                    setActive("completado");
                                    setIsViewingTasks(true);
                                    setIsCreating(false);
                                    setStatusFilter("COMPLETED");
                                    closeMenuOnMobile();
                                }}
                                    className={` hover:bg-green-700 px-4 py-2 rounded-xl w-full flex items-center justify-center ${active === "completado" ? "bg-green-600 " : ""}`}>
                                    Completas
                                </button>


                            </div>
                        )}
                    </div>
                    <div className='border-1'></div>
                </div>


                <div
                    className={`
                    transition-all duration-300
                    px-4 py-6
                    w-full
                    ${menuOpen ? "md:ml-[25%]" : "ml-0"}
                    `}
                    >

                    {isCreating && (
                        <div className=' rounded-xl border-1 p-5 mb-2'>
                            <h1 className='mb-5'>Crear Tarea</h1>
                            <Task data={task} onUpdated={() => {
                                fetchTasks(statusFilter);
                                setIsViewingTasks(true);
                            }} />
                        </div>

                    )}
                    {isViewingTasks && (
                        <div className='rounded-xl border-1 p-5'>
                            <h1 className='mb-5'>{titleMap[statusFilter]}</h1>
                            {tasks.map(t => (
                                <TasksAccordion
                                    data={t}
                                    key={t.id}
                                    onUpdated={() => {
                                        fetchTasks(statusFilter);
                                    }} />
                            ))}
                        </div>
                    )}

                </div>
            </div>


            <footer
                className="
    relative
    z-50
    p-4
    border-t
    bg-white
  "
            >
                <p>© 2025 Mi Sitio. Todos los derechos reservados.</p>
            </footer>

        </div>
    );
};

export default TasksPage;