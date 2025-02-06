import axios from 'axios';

export const fetchEvents = async ({ keyword, category, date, location }) => {
    if (!keyword && !category && !date && !location) {
        console.log('No search criteria provided. Skipping API call.');
        return [];
    }

    try {
        let formatDate = null;
        if (date) {
            const newDate = new Date(`${date}T18:00:00.000Z`);
            if (isNaN(newDate.getTime())) {
                console.error('Invalid date:', date);
                return [];
            }
            formatDate = newDate.toISOString().replace(".000", "");
        }

        const response = await axios.get('http://localhost:5000/api/events', {
            params: { keyword, category, date: formatDate, location },
        });

        console.log('API Response:', response.data);
        return response.data._embedded?.events || [];
    } catch (error) {
        console.error('Error fetching events:', error.response ? error.response.data : error.message);
        return [];
    }
};