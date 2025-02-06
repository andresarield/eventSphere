// Formatea una fecha para que sea compatible con la API.
export const formatDateForAPI = (date) => {
    if (!date) return null; // Si no hay fecha, retorna nulkl.

    const newDate = new Date(`${date}T18:00:00.000Z`); // Crea un objeto Date con la hora UTC.
    if (isNaN(newDate.getTime())) { // Verifica si la fecha es válida.
        console.error('Invalid date:', date);
        return null; // Devuelve null si la fecha no es válida.
    }
    return newDate.toISOString().replace(".000", ""); // Formatea la fecha en ISO y elimina los milisegundos.
};