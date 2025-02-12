export interface Event {
    id: string;
    name: string;
    date: string;  // Fecha del evento
    location: string;  // Ubicación
    category: string;  // Categoría del evento
    image: string;  // Imagen asociada al evento
    url: string;  // URL del evento
}

export interface TicketMasterResponse {
    _embedded: {
        events: Event[];
    };
}