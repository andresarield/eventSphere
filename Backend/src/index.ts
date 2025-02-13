import express from "express";
import cors from "cors";
import eventsRouter from "./routes/events";
import { fetchEvents } from "./services/ticketmaster";  // Importa la función fetchEvents

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ruta para obtener eventos filtrados
app.get("/api/events", async (req, res) => {
    // Captura los parámetros de consulta enviados en la URL
    const { date, category, keyword, location } = req.query;

    console.log("Fecha recibida:", date);  // Esto debería mostrar la fecha recibida en la terminal
    console.log("Categoría recibida:", category);  // Esto debería mostrar la categoría

    try {
        // Pasa los parámetros a la función fetchEvents para obtener los eventos filtrados
        const events = await fetchEvents({
            date: date as string,  // Convierte el parámetro a string
            category: category as string,
            keyword: keyword as string,
            location: location as string,
        });

        res.json(events);  // Devuelve los eventos filtrados como respuesta
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        res.status(500).json({ error: "Hubo un problema al obtener los eventos" });
    }
});

app.use("/api/events", eventsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
