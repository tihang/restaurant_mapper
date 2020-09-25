import useSWR from "swr";
import { fetcher } from "./../lib/fetcher";

export default function getRestaurants(latitude, longitude) {
  // QUERY STRING TO FETCH DATA
  const queryString = `/api/restaurants?latitude=${latitude}&longitude=${longitude}`;

  const { data, error } = useSWR(queryString, fetcher);
  return { data, error };
}
