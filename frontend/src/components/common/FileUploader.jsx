import { useState } from "react";
import Papa from "papaparse";

export default function FileUploader({ onData }) {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        onData(result.data);
      },
    });
  };

  return (
    <div className="p-4 bg-white shadow">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 mt-3"
        onClick={handleUpload}
      >
        Upload CSV
      </button>
    </div>
  );
}