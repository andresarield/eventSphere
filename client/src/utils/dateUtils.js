export const formatDateForAPI = (date) => {
    if (!Date) return null;

    const newDate = new Date(`${date}T18:00:00.000Z`);
    if (isNaN(newDate.getTime())) {
        console.error('Invalid date:', date);
        return null;
    }
    return newDate.toISOString().replace(".000", "");
};