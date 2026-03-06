import React, { useState } from 'react';

/**
 * FileUploader
 * - Accepts CSV
 * - Calls provided onUpload(file)
 */
const FileUploader = ({ title, description, onUpload, disabled }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    await onUpload(file);
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3">
        <div className="text-sm font-semibold">{title}</div>
        {description ? <div className="mt-1 text-xs text-slate-600">{description}</div> : null}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="file"
          accept=".csv,text/csv"
          disabled={disabled}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:text-white hover:file:bg-slate-700"
        />
        <button
          type="submit"
          disabled={disabled || !file}
          className="w-fit rounded-md bg-slate-900 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUploader;


