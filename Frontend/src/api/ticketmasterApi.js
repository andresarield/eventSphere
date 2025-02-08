import axios from 'axios';

// Uso una variable de entorno para almacenar la URL base de la API.
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/events';

export const fetchEventsFromAPI = async (params = {}) => {
    const defaultParams = {
        size: 10, // Número de eventos por default por página.
        page: 0,  // Número de página por default.
    };

    const finalParams = { ...defaultParams, ...params }; // Combina los parámetros por defecto con los proporcionados.

    try {
        const response = await axios.get(BASE_URL, {
            params: finalParams,
            timeout: 10000 // Tiempo de espera límite de 10 segundos.
        });

        // Acá valido la estructura de la respuesta de la API.
        if (!response.data._embedded || !Array.isArray(response.data._embedded.events)) {
            console.warn('Unexpected API response structure:', response.data);
            return [];
        }

        // Muestro la respuesta de la API en la consola en modo de desarrollo.
        if (process.env.NODE_ENV === 'development') {
            console.log('API response:', response.data);
        }

        return response.data._embedded.events;
    } catch (error) {
        console.error('Error fetching events:', error.response ? error.response.data : error.message);
        throw error;
    }
};








// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api/events'; // URL base del backend.

// // Realiza una peticion GET para obtener eventos desde la API.
// export const fetchEventsFromAPI = async (params) => {
//     try {
//         const response = await axios.get(BASE_URL, { params }); // Realiza la petición con los parámetros proporcionados.
//         console.log('API response:', response.data); // Muestra la respuesta de la API en la consola.
//         return response.data._embedded?.events || []; // Retorna los eventos o un array vacío si no hay datos.
//     } catch (error) {
//         console.error('Error fetching events:', error.response ? error.response.data : error.message); // Maneja errores.
//         throw error; // Relanza el error para manejarlo en el controlador.
//     }
// };