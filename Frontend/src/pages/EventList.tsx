import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import SearchBar from "../components/SearchBar";

export default function EventList() {
  const [filter, setFilter] = useState("");
  const { data: events, isLoading } = useEvents(filter);

  return (
    <div>
      <SearchBar onSearch={setFilter} />
      {isLoading ? <p>Cargando eventos...</p> : (
        <ul>
          {events?.map((event) => (
            <li key={event.id}>{event.name} - {event.date}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
