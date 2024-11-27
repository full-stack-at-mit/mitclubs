import axios from "axios";
// sends cookies back to server
axios.defaults.withCredentials = true;

export async function getClubs() {
  return await axios.get("http://localhost:8000/api/get-clubs");
}
