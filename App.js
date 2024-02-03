
import React, { useState } from 'react';
import FileUploader from './FileUploader';
import ModelMetrics from './ModelMetrics';
import TimeSeriesChart from './TimeSeriesChart';


const App = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [modelMetrics, setModelMetrics] = useState(null);

  const handleFileUpload = (data) => {
    setUploadedData(data);
    const processedMetrics = processModel(data);
    setModelMetrics(processedMetrics);
  };

  const processModel = (data) => {
    const iterableData = Array.isArray(data) ? data : [data];
    // Implement your model processing logic here
    // For simplicity, let's assume processedData is a copy of the original data
    return { accuracy: 0.85, mae: 0.1, rmse: 0.15, processedData: [...iterableData] };
  };

  const handleDownload = () => {
    if (modelMetrics && modelMetrics.processedData) {
      const processedDataString = JSON.stringify(modelMetrics.processedData, null, 2);
      const blob = new Blob([processedDataString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a link element and trigger a download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'processed_data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Optionally revoke the object URL to free up resources
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div>
      <h1 >Data Processing App</h1>
      <FileUploader onUpload={handleFileUpload} />
      {uploadedData && (
        <>
          <ModelMetrics metrics={modelMetrics} processedData={uploadedData} onDownload={handleDownload} />
          <TimeSeriesChart data={uploadedData} processedData={modelMetrics?.processedData} />
        </>
      )}
    </div>
  );
};

export default App;