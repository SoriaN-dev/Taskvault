import api from "./axios";

export const deleteTask = async (id)=>{
    try {
        const response = await api.delete(`/tasks/${id}`);
        console.log(response.data)
    
    return response.data;
        
    } catch (error) {
        console.error("Error al Eliminar:", error);
        return null;
        
    }

}
export const updateTask = async (id, task) => {
    try {

        const response = await api.put(`/tasks/${id}`,task);
        console.log(response);
        return response.data;
        
    } catch (error) {
         console.error("Error al Actualizar:", error);
        return null;
        
    }
}

export const getUserTasks = async () => {
  try {
    const response = await api.get("/tasks/all");
    console.log(response.data)
    
    return response.data;
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    console.log(localStorage.getItem("token"))
    return [];
  }
};

export const saveTask = async (task) => {
  try {
    const response = await api.post(
     "/tasks", task);
    console.log(response)
  } catch (error) {
    console.error("Error al Guardar:", error);
    return null;
  }

};
 export const getTasksByStatus = async (status) => {
    console.log(status)

    try{
        const response = await api.get("/tasks/status",{
        params: { status }
    });
        console.log(response)
        return response.data;

    }catch (error) {
    console.error("Error al buscar por el estado:", error);
    return null;
  }

 }