import api from "./api";

export const uploadSales = (data) => {
  return api.post("/upload-sales-data", data);
};