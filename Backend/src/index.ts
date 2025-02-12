import express from "express";
import cors from "cors";
import eventsRouter from "./routes/events";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/events", eventsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
