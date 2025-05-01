//For external API calls if needed
import axios from "axios";

export const apiClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
