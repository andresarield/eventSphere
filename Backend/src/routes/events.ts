import express, { Request, Response, Router } from 'express';
import { fetchEvents } from "../services/ticketmaster";

const router: Router = express.Router();

// Ruta para obtener eventos con parámetros opcionales
router.get("/", async (req: Request, res: Response): Promise<void> => {
    const { keyword, date, category, location } = req.query;

    // Validación de los parámetros de entrada
    if (keyword && typeof keyword !== "string") {
        res.status(400).json({ error: "Keyword must be a string" });
        return; // Salir después de responder
    }

    // Preparar los parámetros para la función fetchEvents, excluyendo aquellos que no están definidos
    const filters: Record<string, string | undefined> = {};

    if (keyword) filters.keyword = keyword as string;
    if (date) filters.date = date as string;
    if (category) filters.category = category as string;
    if (location) filters.location = location as string;

    // Validar que al menos un filtro esté presente
    if (Object.keys(filters).length === 0) {
        res.status(400).json({ error: "At least one filter parameter (keyword, date, category, location) must be provided." });
        return;
    }

    try {
        // Llamar al servicio fetchEvents con los filtros construidos
        const events = await fetchEvents(filters);

        if (events.length === 0) {
            // Si no hay eventos, responder con un mensaje adecuado
            res.status(404).json({ message: "No events found matching the filters." });
        } else {
            // Responder con los eventos encontrados
            res.json(events);
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        // En caso de error, responder con un mensaje adecuado
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;