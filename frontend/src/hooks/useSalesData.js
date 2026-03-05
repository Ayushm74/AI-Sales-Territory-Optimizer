import { useEffect, useState } from "react";
import api from "../services/api";

export default function useSalesData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/sales").then((res) => setData(res.data));
  }, []);

  return data;
}