import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEvents = async (filter: string) => {
  const { data } = await axios.get(`/api/events?filter=${filter}`);
  return data;
};

export function useEvents(filter: string) {
  return useQuery(["events", filter], () => fetchEvents(filter));
}
