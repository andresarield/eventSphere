export const formatDateForAPI = (date) => {
    console.log('date:', typeof date !== 'String');
    if (!date) return null; //Retorna null si no hay fecha o si el tipo de dato no es string.

    try {
        // Agrega una hora específica en UTC para evitar problemas con la zona horaria.
        const newDate = new Date(`${date}T18:00:00.000Z`);

        return newDate.toISOString().replace(".000", "");
    } catch (error) {
        console.error('Error in formatDateForAPI:', error.message);
        return null;
    }
};

export const isValidDate = (date) => {
    if (!date || typeof date !== 'string') return false; // Retorna falso si no hay fecha o si el tipo de dato no es válido.
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate); // Retorna verdadero si la fecha es válida, falso en caso contrario.
};