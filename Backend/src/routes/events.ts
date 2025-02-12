import express, { Request, Response, Router } from 'express';
import { fetchEvents } from "../services/ticketmaster";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const { keyword, date, category, location } = req.query;

        // Validación de keyword solo si se proporciona
        if (keyword && typeof keyword !== "string") {
            res.status(400).json({ error: "Keyword must be a string" });
            return; // Salir después de responder
        }

        // Llamada a fetchEvents con los parámetros opcionales
        const events = await fetchEvents({
            keyword: keyword as string | undefined,
            date: date as string | undefined,
            category: category as string | undefined,
            location: location as string | undefined,
        });

        res.json(events);  // Aquí también se responde sin necesidad de retornar
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
