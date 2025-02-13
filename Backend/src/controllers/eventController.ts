import { Request, Response } from 'express';
import { fetchEvents } from '../services/ticketmaster';

export async function getEvents(req: Request, res: Response): Promise<void> {
    try {
        // Desestructuración de los parámetros de la query
        const { keyword, date, category, location } = req.query;

        // Validación del parámetro 'keyword'
        if (keyword && typeof keyword !== 'string') {
            res.status(400).json({ error: 'Keyword must be a string' });
            return;
        }

        // Llamada al servicio de Ticketmaster para obtener los eventos
        const events = await fetchEvents({
            keyword: keyword as string | undefined,
            date: date as string | undefined,
            category: category as string | undefined,
            location: location as string | undefined,
        });

        // Respuesta con los eventos obtenidos
        res.json(events);

    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}