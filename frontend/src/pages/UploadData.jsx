import FileUploader from "../components/common/FileUploader";
import { useState } from "react";
import SalesDataTable from "../components/tables/SalesDataTable";

export default function UploadData() {
  const [data, setData] = useState([]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Upload Sales Data</h1>

      <FileUploader onData={setData} />

      {data.length > 0 && <SalesDataTable data={data} />}
    </div>
  );
}