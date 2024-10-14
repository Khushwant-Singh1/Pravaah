import React, { useState } from 'react';
import Papa from 'papaparse';
import { Droplets, Zap, Leaf } from 'lucide-react';

const parameters = [
  { name: 'pH', icon: <Leaf className="w-5 h-5" />, min: 0, max: 14, step: 0.1, unit: '' },
  { name: 'Hardness', icon: <Zap className="w-5 h-5" />, min: 0, max: 1000, step: 1, unit: 'mg/L' },
  { name: 'Solids', icon: <Leaf className="w-5 h-5" />, min: 0, max: 50000, step: 1, unit: 'ppm' },
  { name: 'Chloramines', icon: null, min: 0, max: 10, step: 0.1, unit: 'mg/L' },
  { name: 'Sulfate', icon: null, min: 0, max: 500, step: 1, unit: 'mg/L' },
  { name: 'Conductivity', icon: null, min: 0, max: 10000, step: 1, unit: 'µS/cm' },
  { name: 'Organic_carbon', icon: null, min: 0, max: 50, step: 0.1, unit: 'mg/L' },
  { name: 'Trihalomethanes', icon: null, min: 0, max: 100, step: 1, unit: 'µg/L' },
  { name: 'Turbidity', icon: null, min: 0, max: 5, step: 0.1, unit: 'NTU' },
];

// hardeness = 75, Solids = 250, Chloramines = 4, Sulfate = 250, Conductivity = 300, Organic_carbon = 10, Trihalomethanes = 100, Turbidity = 5
function Button({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

function Input({ id, type, min, max, step, value, onChange, className, placeholder }) {
  return (
    <input
      id={id}
      type={type}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      placeholder={placeholder}
    />
  );
}

export default function WaterQualityAnalyzer() {
  const [values, setValues] = useState(() =>
    parameters.reduce((acc, param) => ({ ...acc, [param.name]: param.min }), {})
  );
  const [prediction, setPrediction] = useState(null);
  const [useCSV, setUseCSV] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  const handleFileUpload = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleInputChange = (name, value) => {
    const param = parameters.find((p) => p.name === name);
    if (!param) return;
    let newValue = Number(value);
    newValue = Math.max(param.min, Math.min(param.max, newValue));
    setValues((prev) => ({ ...prev, [name]: newValue }));
  };

  // Handle manual form submission and prediction
  const handleSubmit = async () => {
    const data = {
      ph: values['pH'],
      Hardness: values['Hardness'],
      Solids: values['Solids'],
      Chloramines: values['Chloramines'],
      Sulfate: values['Sulfate'],
      Conductivity: values['Conductivity'],
      Organic_carbon: values['Organic_carbon'],
      Trihalomethanes: values['Trihalomethanes'],
      Turbidity: values['Turbidity']
    };
  
    fetch('http://localhost:8080/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setPrediction(result.prediction_percentage);
      })
      .catch(error => console.error('Error:', error));
  };

  // Handle CSV submission and prediction
  const handleCSVSubmit = async () => {
    if (!csvFile) return;

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const response = await fetch('http://localhost:8080/predict_csv', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      const predictionValue = result.prediction[0][0];
      setPrediction(predictionValue * 100); // Convert to percentage
    } catch (error) {
      console.error('Error during CSV prediction:', error);
    }
  };

  const classifyWaterQuality = (value) => {
    if (value >= 80) return { text: 'Good', color: 'text-green-500' };
    if (value >= 50) return { text: 'Moderate', color: 'text-yellow-500' };
    return { text: 'Poor', color: 'text-red-500' };
  };

  const handleDownloadCSV = () => {
    const csvData = [
      parameters.map((param) => param.name), // Header row
      parameters.map((param) => values[param.name]), // Data row
    ];
    const csvContent = Papa.unparse(csvData);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'water_quality_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bac flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg text-white p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Water Quality Analyzer</h2>
          <p className="text-white text-opacity-70">
            {useCSV ? 'Upload a CSV file to predict water quality' : 'Enter water quality parameters manually'}
          </p>
        </div>

        {/* <div className="mb-6">
          <Button onClick={() => setUseCSV(!useCSV)} className="w-full">
            {useCSV ? 'Switch to Manual Input' : 'Switch to CSV Upload'}
          </Button>
        </div> */}

        {useCSV ? (
          <div className="mb-6">
            <label htmlFor="csvUpload" className="block text-sm font-medium mb-2">
              Upload CSV File
            </label>
            <input
              id="csvUpload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
            <Button onClick={handleCSVSubmit} className="w-full mt-4">
              Predict Water Quality from CSV
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {parameters.map((param) => (
              <div key={param.name} className="space-y-1">
                <div className="flex items-center space-x-2">
                  {param.icon}
                  <label htmlFor={param.name} className="text-sm font-medium">
                    {param.name}
                  </label>
                </div>
                <Input
                  id={param.name}
                  type="number"
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  value={values[param.name]}
                  onChange={(e) => handleInputChange(param.name, e.target.value)}
                  placeholder={`${param.min}-${param.max} ${param.unit}`}
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-center space-y-4">
          {!useCSV && (
            <>
              <Button onClick={handleSubmit} className="w-full">
                Predict Water Quality
                <Droplets className="ml-2 inline-block w-4 h-4" />
              </Button>
              
            </>
          )}

          {prediction !== null && (
            <div className="text-center">
              <p className="text-lg">Predicted Water Quality:</p>
              <p className={`text-4xl font-bold ${classifyWaterQuality(prediction).color}`}>
                {prediction.toFixed(2)}%
              </p>
              <p className={`text-xl ${classifyWaterQuality(prediction).color}`}>
                {classifyWaterQuality(prediction).text}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
