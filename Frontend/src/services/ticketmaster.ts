export async function fetchEvents(keyword: string) {
    const response = await fetch(`http://localhost:5000/api/events?keyword=${keyword}`);
    if (!response.ok) throw new Error("Error fetching events");
    return response.json();
  }
  