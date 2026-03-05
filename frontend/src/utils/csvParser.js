import Papa from "papaparse";

export function parseCSV(file, callback) {
  Papa.parse(file, {
    header: true,
    complete: (results) => {
      callback(results.data);
    },
  });
}