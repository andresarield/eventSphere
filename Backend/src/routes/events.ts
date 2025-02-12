import express, { Request, Response, Router } from 'express';
import { fetchEvents } from "../services/ticketmaster";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const { keyword, date, category, location } = req.query;

        if (!keyword || typeof keyword !== "string") {
            res.status(400).json({ error: "Keyword is required and must be a string" });
            return; // Salir después de responder
        }

        const events = await fetchEvents({
            keyword: keyword as string,
            date: date as string,
            category: category as string,
            location: location as string,
        });

        res.json(events);  // Aquí también se responde sin necesidad de retornar
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;